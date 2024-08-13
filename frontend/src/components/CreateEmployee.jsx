import React, { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.css';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { name, email, mobileNo, designation, gender, course, image } = formData;

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email format is invalid';
    }
    if (!mobileNo) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^\d+$/.test(mobileNo)) {
      newErrors.mobileNo = 'Mobile number must be numeric';
    }
    if (!designation) newErrors.designation = 'Designation is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (course.length === 0) newErrors.course = 'At least one course must be selected';
    if (image && !['image/jpeg', 'image/png'].includes(image.type)) {
      newErrors.image = 'Only jpg/png files are allowed';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (e.target.name === 'course') {
      const newCourse = [...course];
      if (e.target.checked) {
        newCourse.push(e.target.value);
      } else {
        const index = newCourse.indexOf(e.target.value);
        if (index > -1) {
          newCourse.splice(index, 1);
        }
      }
      setFormData({ ...formData, course: newCourse });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      form.append('mobileNo', mobileNo);
      form.append('designation', designation);
      form.append('gender', gender);
      form.append('course', JSON.stringify(course));
      if (image) {
        form.append('image', image);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('/api/employees', form, config);
      console.log(res.data);
      // Reset form and show success message
      setFormData({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
      });
      setErrors({});
      alert('Employee created successfully!');
    } catch (err) {
      console.error(err.response.data);
      setErrors({ form: 'Failed to create employee. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-employee-container">
      {/* <header className="header">
        <nav>
          <a href="/" className="nav-link">Home</a>
          <a href="/employee-list" className="nav-link">Employee List</a>
          <a href="/logout" className="nav-link">Logout</a>
        </nav>
      </header> */}
      <h3 className="form-title">Create Employee</h3>
      <form onSubmit={onSubmit} className="employee-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="form-input"
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="form-input"
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="mobileNo">Mobile No</label>
          <input
            type="text"
            placeholder="Mobile No"
            name="mobileNo"
            value={mobileNo}
            onChange={onChange}
            required
            className="form-input"
            aria-invalid={errors.mobileNo ? 'true' : 'false'}
          />
          {errors.mobileNo && <span className="error-message">{errors.mobileNo}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <select
            name="designation"
            value={designation}
            onChange={onChange}
            required
            className="form-select"
            aria-invalid={errors.designation ? 'true' : 'false'}
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <span className="error-message">{errors.designation}</span>}
        </div>
        <div className="form-group form-gender">
          <label>Gender</label>
          <label className="form-label">
            <input
              type="radio"
              name="gender"
              value="M"
              checked={gender === 'M'}
              onChange={onChange}
              className="form-radio"
              aria-invalid={errors.gender ? 'true' : 'false'}
            /> Male
          </label>
          <label className="form-label">
            <input
              type="radio"
              name="gender"
              value="F"
              checked={gender === 'F'}
              onChange={onChange}
              className="form-radio"
              aria-invalid={errors.gender ? 'true' : 'false'}
            /> Female
          </label>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
        <div className="form-group form-courses">
          <label>Course</label>
          <label className="form-label">
            <input
              type="checkbox"
              name="course"
              value="MCA"
              checked={course.includes('MCA')}
              onChange={onChange}
              className="form-checkbox"
              aria-invalid={errors.course ? 'true' : 'false'}
            /> MCA
          </label>
          <label className="form-label">
            <input
              type="checkbox"
              name="course"
              value="BCA"
              checked={course.includes('BCA')}
              onChange={onChange}
              className="form-checkbox"
              aria-invalid={errors.course ? 'true' : 'false'}
            /> BCA
          </label>
          <label className="form-label">
            <input
              type="checkbox"
              name="course"
              value="BSC"
              checked={course.includes('BSC')}
              onChange={onChange}
              className="form-checkbox"
              aria-invalid={errors.course ? 'true' : 'false'}
            /> BSC
          </label>
          {errors.course && <span className="error-message">{errors.course}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            name="image"
            onChange={onChange}
            className="form-file-input"
            aria-invalid={errors.image ? 'true' : 'false'}
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
        </div>
        <button type="submit" className="form-submit-button" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {errors.form && <span className="error-message form-error">{errors.form}</span>}
      </form>
    </div>
  );
}

export default CreateEmployee;
