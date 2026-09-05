/*
=================================================
Student Details
=================================================
Name : Dipendra Chaulagain
Roll No. : 22
Contact No. : 9761715127
Address : Hetauda-5
Program : BSc CSIT
Semester : 2nd
=================================================
Task: College Event Registration Form
=================================================
*/

import { useState } from "react";
import "./EventRegistration.css";

const initialForm = {
  participantName: "",
  email: "",
  phone: "",
  collegeName: "",
  faculty: "BSc CSIT",
  semester: "2nd",
  event: "Web Development Workshop",
  participationType: "Individual",
  teamMembers: "",
  foodPreference: "Vegetarian",
  requirements: [],
  comments: "",
  agreeToRules: false,
};

function EventRegistration() {
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

  const handleRequirementChange = (requirement) => {
    if (form.requirements.includes(requirement)) {
      updateField(
        "requirements",
        form.requirements.filter((item) => item !== requirement)
      );
    } else {
      updateField("requirements", [
        ...form.requirements,
        requirement,
      ]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.participantName.trim()) {
      newErrors.participantName = "Participant name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!form.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }

    if (form.participationType === "Team" && !form.teamMembers) {
      newErrors.teamMembers = "Number of team members is required";
    }

    if (!form.agreeToRules) {
      newErrors.agreeToRules = "You must agree to the event rules";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      console.log("Registration submitted:", data);

      setSuccess("Registration successful!");

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error(error);

      setErrors({
        submit: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-container">
      <div className="event-form-wrapper">

        <h1>College Event Registration</h1>

        <p className="event-subtitle">
          Register for your favorite college event
        </p>

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        {errors.submit && (
          <p className="error-message">
            {errors.submit}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Participant Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.participantName}
              onChange={(e) =>
                updateField(
                  "participantName",
                  e.target.value
                )
              }
            />

            {errors.participantName && (
              <p className="field-error">
                {errors.participantName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                updateField(
                  "email",
                  e.target.value
                )
              }
            />

            {errors.email && (
              <p className="field-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={(e) =>
                updateField(
                  "phone",
                  e.target.value
                )
              }
            />

            {errors.phone && (
              <p className="field-error">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              placeholder="Enter your college name"
              value={form.collegeName}
              onChange={(e) =>
                updateField(
                  "collegeName",
                  e.target.value
                )
              }
            />

            {errors.collegeName && (
              <p className="field-error">
                {errors.collegeName}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>Faculty</label>

            <select
              value={form.faculty}
              onChange={(e) =>
                updateField(
                  "faculty",
                  e.target.value
                )
              }
            >
              <option value="BSc CSIT">BSc CSIT</option>
              <option value="BCA">BCA</option>
              <option value="BIM">BIM</option>
              <option value="BIT">BIT</option>
              <option value="BBM">BBM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Semester</label>

            <select
              value={form.semester}
              onChange={(e) =>
                updateField(
                  "semester",
                  e.target.value
                )
              }
            >
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
            </select>
          </div>

          <div className="form-group">
            <label>Event</label>

            <select
              value={form.event}
              onChange={(e) =>
                updateField(
                  "event",
                  e.target.value
                )
              }
            >
              <option value="Web Development Workshop">
                Web Development Workshop
              </option>

              <option value="AI Seminar">
                AI Seminar
              </option>

              <option value="Coding Competition">
                Coding Competition
              </option>

              <option value="UI/UX Workshop">
                UI/UX Workshop
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Participation Type</label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="participationType"
                  value="Individual"
                  checked={
                    form.participationType === "Individual"
                  }
                  onChange={(e) =>
                    updateField(
                      "participationType",
                      e.target.value
                    )
                  }
                />
                Individual
              </label>

              <label>
                <input
                  type="radio"
                  name="participationType"
                  value="Team"
                  checked={
                    form.participationType === "Team"
                  }
                  onChange={(e) =>
                    updateField(
                      "participationType",
                      e.target.value
                    )
                  }
                />
                Team
              </label>

            </div>
          </div>

          {form.participationType === "Team" && (
            <div className="form-group">
              <label>Number of Team Members</label>

              <input
                type="number"
                min="1"
                placeholder="Enter number of members"
                value={form.teamMembers}
                onChange={(e) =>
                  updateField(
                    "teamMembers",
                    e.target.value
                  )
                }
              />

              {errors.teamMembers && (
                <p className="field-error">
                  {errors.teamMembers}
                </p>
              )}
            </div>
          )}

          <div className="form-group">
            <label>Food Preference</label>

            <div className="radio-group">

              <label>
                <input
                  type="radio"
                  name="foodPreference"
                  value="Vegetarian"
                  checked={
                    form.foodPreference === "Vegetarian"
                  }
                  onChange={(e) =>
                    updateField(
                      "foodPreference",
                      e.target.value
                    )
                  }
                />
                Vegetarian
              </label>

              <label>
                <input
                  type="radio"
                  name="foodPreference"
                  value="Non-Vegetarian"
                  checked={
                    form.foodPreference === "Non-Vegetarian"
                  }
                  onChange={(e) =>
                    updateField(
                      "foodPreference",
                      e.target.value
                    )
                  }
                />
                Non-Vegetarian
              </label>

            </div>
          </div>

          <div className="form-group">
            <label>Requirements</label>

            <div className="checkbox-group">

              <label>
                <input
                  type="checkbox"
                  checked={form.requirements.includes(
                    "Certificate"
                  )}
                  onChange={() =>
                    handleRequirementChange(
                      "Certificate"
                    )
                  }
                />
                Certificate
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.requirements.includes(
                    "Lunch"
                  )}
                  onChange={() =>
                    handleRequirementChange(
                      "Lunch"
                    )
                  }
                />
                Lunch
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.requirements.includes(
                    "Workshop Materials"
                  )}
                  onChange={() =>
                    handleRequirementChange(
                      "Workshop Materials"
                    )
                  }
                />
                Workshop Materials
              </label>

            </div>
          </div>

          <div className="form-group">
            <label>Comments / Special Request</label>

            <textarea
              placeholder="Enter any comments or special requests"
              value={form.comments}
              onChange={(e) =>
                updateField(
                  "comments",
                  e.target.value
                )
              }
            />
          </div>

          <div className="rules-group">
            <label>
              <input
                type="checkbox"
                checked={form.agreeToRules}
                onChange={(e) =>
                  updateField(
                    "agreeToRules",
                    e.target.checked
                  )
                }
              />
              I agree to the event rules
            </label>

            {errors.agreeToRules && (
              <p className="field-error">
                {errors.agreeToRules}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register for Event"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EventRegistration;