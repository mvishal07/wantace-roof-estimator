import { useEffect, useState } from "react";

import { getPublicConfig } from "../api/configApi";
import { submitEstimate } from "../api/estimateApi";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

const Estimator = () => {
  const [config, setConfig] = useState(null);

  const [currentStep, setCurrentStep] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);

        const response =
          await getPublicConfig();

        setConfig(response.data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load estimator."
        );
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const questions =
    config?.questions || [];

  const currentQuestion =
    questions[currentStep];

  const updateAnswer = (value) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.key]: value,
    }));
  };

  const nextStep = () => {
    setError("");

    if (
      currentQuestion.required &&
      !answers[currentQuestion.key]
    ) {
      setError(
        "Please answer this question before continuing."
      );

      return;
    }

    if (
      currentQuestion.type === "number"
    ) {
      const numberValue = Number(
        answers[currentQuestion.key]
      );

      if (
        numberValue <
          currentQuestion.min ||
        numberValue >
          currentQuestion.max
      ) {
        setError(
          `Please enter a value between ${currentQuestion.min} and ${currentQuestion.max}.`
        );

        return;
      }
    }

    setCurrentStep(
      (previous) => previous + 1
    );
  };

  const previousStep = () => {
    setError("");

    setCurrentStep(
      (previous) => previous - 1
    );
  };

  const updateContact = (event) => {
    const { name, value } =
      event.target;

    setContact((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (
      !contact.name ||
      !contact.phone ||
      !contact.email
    ) {
      setError(
        "Please complete all contact fields."
      );

      return;
    }

    try {
      setSubmitting(true);

      const response =
        await submitEstimate({
          ...contact,
          answers,
        });

      setResult(response.data);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Unable to calculate estimate."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-center">
        Loading estimator...
      </div>
    );
  }

  if (error && !config) {
    return (
      <div className="page-center">
        {error}
      </div>
    );
  }

  if (result) {
    return (
      <div className="estimator-container">
        <div className="result-card">
          <h1>Your Estimated Range</h1>

          <div className="estimate">
            <span>
              {config.business.currency}
            </span>

            <strong>
              {result.estimateLow.toLocaleString()}
            </strong>

            <span> to </span>

            <strong>
              {result.estimateHigh.toLocaleString()}
            </strong>
          </div>

          <p>
            This is an estimated range based on
            the information you provided.
          </p>
        </div>
      </div>
    );
  }

  const contactStep =
    currentStep === questions.length;

  return (
    <div className="estimator-container">

      <header className="estimator-header">
        <h1>
          {config.business.name}
        </h1>

        <p>
          Get your roofing estimate
        </p>
      </header>

      {!contactStep && (
        <ProgressBar
          currentStep={currentStep}
          totalSteps={questions.length}
        />
      )}

      {!contactStep && currentQuestion && (
        <div className="step-container">

          <QuestionCard
            question={currentQuestion}
            value={
              answers[currentQuestion.key]
            }
            onChange={updateAnswer}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <div className="navigation">

            {currentStep > 0 && (
              <button
                type="button"
                onClick={previousStep}
              >
                Back
              </button>
            )}

            <button
              type="button"
              onClick={nextStep}
            >
              Next
            </button>

          </div>
        </div>
      )}

      {contactStep && (
        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <h2>
            Get your estimate
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={contact.name}
            onChange={updateContact}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={contact.phone}
            onChange={updateContact}
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={contact.email}
            onChange={updateContact}
          />

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Calculating..."
              : "Get My Estimate"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Estimator;