import React, { useState } from "react";
import axios from "axios";

const Testingform = () => {
  const [formData, setFormData] = useState({
    srt_id: "",
    contact_person: "",
    contact_number: "",
    inverter_no: "",
    solarmeter_no: "",
    nm_sm_no: "",
    ca_no: "",
    loger_no: "",
    inst_latitude: "",
    inst_longitude: "",
    inst_remarks: "",
  });

  const [files, setFiles] = useState({
    panel_image: null,
    system_image: null,
    inverter_image: null,
    nm_sm_image: null,
    loger_image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = new FormData();

    // ✅ append text fields (NO Blob)
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    // ✅ append files
    Object.entries(files).forEach(([key, file]) => {
      if (file) submissionData.append(key, file);
    });

    try {
      const response = await axios.post(
        "https://klkerp.com/api/bihar/srt/installation-store",
        submissionData,
        {
          headers: {
            Authorization:
              "Bearer iiwit3HZevxiI28OAHuIlbcrM0g2DKuq39oz7AU12a631887",
          },
        }
      );

      console.log("✅ SUCCESS RESPONSE:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("❌ ERROR:", error.response || error.message);
      alert(
        "Submission failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto" }}>
      <h2>Installation Form</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field} style={{ marginBottom: 12 }}>
            <label>
              <b>{field.replace(/_/g, " ").toUpperCase()}</b>
            </label>
            <input    
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8 }}
            />
          </div>
        ))}   

        <h3>Upload Images</h3>

        {Object.keys(files).map((key) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label>
              <b>{key.replace(/_/g, " ").toUpperCase()}</b>
            </label>
            <input
              type="file"
              name={key}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Testingform;
