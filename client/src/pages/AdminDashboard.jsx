import { useEffect, useState } from "react";

import {
  getAdminConfig,
  updateAdminConfig,
} from "../api/adminConfigApi";

const AdminDashboard = () => {
  const [config, setConfig] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);

      const response =
        await getAdminConfig();

      setConfig(response.data);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load configuration."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setConfig((previous) => ({
      ...previous,

      business: {
        ...previous.business,
        [name]: value,
      },
    }));
  };

  const handleModifierChange = (
    event
  ) => {
    const { name, value } =
      event.target;

    setConfig((previous) => ({
      ...previous,

      modifiers: {
        ...previous.modifiers,
        [name]: Number(value),
      },
    }));
  };

  const handleQuestionChange = (
    questionIndex,
    field,
    value
  ) => {
    setConfig((previous) => {
      const questions = [
        ...previous.questions,
      ];

      questions[questionIndex] = {
        ...questions[questionIndex],
        [field]: value,
      };

      return {
        ...previous,
        questions,
      };
    });
  };

  const saveConfig = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response =
        await updateAdminConfig(config);

      setConfig(response.data);

      setMessage(
        "Configuration saved successfully."
      );
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to save configuration."
      );
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem("admin");

    window.location.href =
      "/admin/login";
  };

  if (loading) {
    return (
      <div className="page-center">
        Loading configuration...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="page-center">
        {error || "Configuration not found."}
      </div>
    );
  }

  return (
    <div className="admin-page">

      <header className="admin-header">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Configuration version{" "}
            {config.config_version}
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </header>

      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* BUSINESS */}

      <section className="admin-section">

        <h2>Business Information</h2>

        <label>
          Business Name
        </label>

        <input
          name="name"
          value={config.business.name}
          onChange={handleBusinessChange}
        />

        <label>
          Region
        </label>

        <input
          name="region"
          value={config.business.region}
          onChange={handleBusinessChange}
        />

        <label>
          Currency
        </label>

        <input
          name="currency"
          value={config.business.currency}
          onChange={handleBusinessChange}
        />

      </section>

      {/* QUESTIONS */}

      <section className="admin-section">

        <h2>Estimator Questions</h2>

        {config.questions.map(
          (question, index) => (

            <div
              className="question-editor"
              key={question.key}
            >

              <h3>
                {question.key}
              </h3>

              <label>
                Question Label
              </label>

              <input
                value={question.label}
                onChange={(event) =>
                  handleQuestionChange(
                    index,
                    "label",
                    event.target.value
                  )
                }
              />

              <label>
                Active
              </label>

              <input
                type="checkbox"
                checked={question.active}
                onChange={(event) =>
                  handleQuestionChange(
                    index,
                    "active",
                    event.target.checked
                  )
                }
              />

            </div>

          )
        )}

      </section>

      {/* MODIFIERS */}

      <section className="admin-section">

        <h2>Pricing Modifiers</h2>

        <label>
          Waste Factor
        </label>

        <input
          type="number"
          step="0.01"
          name="waste_factor"
          value={
            config.modifiers.waste_factor
          }
          onChange={handleModifierChange}
        />

        <label>
          Permit Fee
        </label>

        <input
          type="number"
          name="permit_flat_fee"
          value={
            config.modifiers
              .permit_flat_fee
          }
          onChange={handleModifierChange}
        />

        <label>
          Estimate Range Spread %
        </label>

        <input
          type="number"
          step="0.01"
          name="range_spread_pct"
          value={
            config.modifiers
              .range_spread_pct
          }
          onChange={handleModifierChange}
        />

      </section>

      <div className="save-container">

        <button
          onClick={saveConfig}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Configuration"}
        </button>

      </div>

    </div>
  );
};

export default AdminDashboard;