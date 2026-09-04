/*
=================================================
Student Details
=================================================
Name       : Dipendra Chaulagain
Roll No.   : 22
Contact No.: 9761715127
Address    : Hetauda-5
Program    : BSc CSIT
Semester   : 2nd
=================================================
Task: Employee Registration Form
=================================================
*/

import { useState } from "react";
import "./EmployeeForm.css";

const initialForm = {
  employeeName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  department: "IT",
  designation: "Intern",
  employmentType: "Full Time",
  salary: "",
  joiningDate: "",
  workFrom: "Office",
  skills: [],
  emergencyContact: "",
  employeeStatus: true,
};

function EmployeeForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.employeeName.trim()) {
      newErrors.employeeName = "Employee name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!form.salary) {
      newErrors.salary = "Salary is required";
    } else if (Number(form.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }

    if (!form.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    if (!form.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log(form);

      setLoading(false);
      setSuccess("Employee registered successfully!");
      setForm(initialForm);
      setErrors({});
    }, 1500);
  };

  return (
    <div className="employee-container">
      <div className="employee-form-wrapper">

        <div className="form-header">
          <div className="header-icon">👤</div>
          <h1>Employee Registration</h1>
          <p>Add a new employee to your organization</p>
          <div className="header-line"></div>
        </div>

        {success && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Personal Information */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon purple">👤</div>
              <div>
                <h2>Personal Information</h2>
                <p>Basic information about the employee</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Employee Name</label>
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={form.employeeName}
                  onChange={(e) =>
                    updateField("employeeName", e.target.value)
                  }
                />

                {errors.employeeName && (
                  <p className="error-message">{errors.employeeName}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                />

                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                />

                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) =>
                    updateField("dateOfBirth", e.target.value)
                  }
                />

                {errors.dateOfBirth && (
                  <p className="error-message">{errors.dateOfBirth}</p>
                )}
              </div>

            </div>
          </div>

          {/* Job Information */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon blue">💼</div>
              <div>
                <h2>Job Information</h2>
                <p>Position and employment details</p>
              </div>
            </div>

            <div className="form-grid">

              <div className="form-group">
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={(e) =>
                    updateField("department", e.target.value)
                  }
                >
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Management">Management</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <select
                  value={form.designation}
                  onChange={(e) =>
                    updateField("designation", e.target.value)
                  }
                >
                  <option value="Intern">Intern</option>
                  <option value="Junior Developer">
                    Junior Developer
                  </option>
                  <option value="Senior Developer">
                    Senior Developer
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Accountant">Accountant</option>
                </select>
              </div>

              {/* Employment Type */}
              <div className="form-group full-width">
                <label>Employment Type</label>

                <div className="choice-group">
                  <label
                    className={
                      form.employmentType === "Full Time"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value="Full Time"
                      checked={form.employmentType === "Full Time"}
                      onChange={(e) =>
                        updateField("employmentType", e.target.value)
                      }
                    />
                    <span>Full Time</span>
                  </label>

                  <label
                    className={
                      form.employmentType === "Part Time"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value="Part Time"
                      checked={form.employmentType === "Part Time"}
                      onChange={(e) =>
                        updateField("employmentType", e.target.value)
                      }
                    />
                    <span>Part Time</span>
                  </label>

                  <label
                    className={
                      form.employmentType === "Contract"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="employmentType"
                      value="Contract"
                      checked={form.employmentType === "Contract"}
                      onChange={(e) =>
                        updateField("employmentType", e.target.value)
                      }
                    />
                    <span>Contract</span>
                  </label>
                </div>
              </div>

              {/* Salary */}
              <div className="form-group">
                <label>Monthly Salary</label>

                <div className="salary-input">
                  <span>Rs.</span>
                  <input
                    type="number"
                    placeholder="Enter monthly salary"
                    value={form.salary}
                    onChange={(e) =>
                      updateField("salary", e.target.value)
                    }
                  />
                </div>

                {errors.salary && (
                  <p className="error-message">{errors.salary}</p>
                )}

                {form.salary && Number(form.salary) > 0 && (
                  <p className="salary-info">
                    Annual Salary: Rs. {Number(form.salary) * 12}
                  </p>
                )}
              </div>

              {/* Joining Date */}
              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  value={form.joiningDate}
                  onChange={(e) =>
                    updateField("joiningDate", e.target.value)
                  }
                />

                {errors.joiningDate && (
                  <p className="error-message">{errors.joiningDate}</p>
                )}
              </div>

              {/* Work Arrangement */}
              <div className="form-group full-width">
                <label>Work Arrangement</label>

                <div className="choice-group">
                  <label
                    className={
                      form.workFrom === "Office"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="workFrom"
                      value="Office"
                      checked={form.workFrom === "Office"}
                      onChange={(e) =>
                        updateField("workFrom", e.target.value)
                      }
                    />
                    <span>🏢 Office</span>
                  </label>

                  <label
                    className={
                      form.workFrom === "Remote"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="workFrom"
                      value="Remote"
                      checked={form.workFrom === "Remote"}
                      onChange={(e) =>
                        updateField("workFrom", e.target.value)
                      }
                    />
                    <span>🏠 Remote</span>
                  </label>

                  <label
                    className={
                      form.workFrom === "Hybrid"
                        ? "choice active"
                        : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="workFrom"
                      value="Hybrid"
                      checked={form.workFrom === "Hybrid"}
                      onChange={(e) =>
                        updateField("workFrom", e.target.value)
                      }
                    />
                    <span>🔄 Hybrid</span>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <div className="section-title">
              <div className="section-icon green">✨</div>
              <div>
                <h2>Additional Information</h2>
                <p>Skills and emergency contact details</p>
              </div>
            </div>

            <div className="form-grid">

              {/* Skills */}
              <div className="form-group full-width">
                <label>Skills</label>

                <div className="skills-group">
                  {["JavaScript", "React", "Node.js", "Python", "SQL"].map(
                    (skill) => (
                      <label
                        key={skill}
                        className={
                          form.skills.includes(skill)
                            ? "skill active"
                            : "skill"
                        }
                      >
                        <input
                          type="checkbox"
                          checked={form.skills.includes(skill)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateField("skills", [
                                ...form.skills,
                                skill,
                              ]);
                            } else {
                              updateField(
                                "skills",
                                form.skills.filter(
                                  (item) => item !== skill
                                )
                              );
                            }
                          }}
                        />
                        <span>{skill}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="form-group">
                <label>Emergency Contact</label>

                <input
                  type="tel"
                  placeholder="Enter emergency contact"
                  value={form.emergencyContact}
                  onChange={(e) =>
                    updateField("emergencyContact", e.target.value)
                  }
                />

                {errors.emergencyContact && (
                  <p className="error-message">
                    {errors.emergencyContact}
                  </p>
                )}
              </div>

              {/* Employee Status */}
              <div className="status-card">
                <div>
                  <strong>Employee Status</strong>
                  <span>
                    {form.employeeStatus
                      ? "Currently active"
                      : "Currently inactive"}
                  </span>
                </div>

                <label className="switch">
                  <input
                    type="checkbox"
                    checked={form.employeeStatus}
                    onChange={(e) =>
                      updateField(
                        "employeeStatus",
                        e.target.checked
                      )
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              <>
                Register Employee
                <span className="arrow">→</span>
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;