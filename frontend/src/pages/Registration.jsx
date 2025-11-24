import { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Step6 from "../components/Step6";
import Step7 from "../components/Step7";
import EmailVerification from "../components/EmailVerification";
import LoadingSvg from "../components/Loading";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNext = async (formData) => {
    const updatedData = { ...data, ...formData };
    setData(updatedData);

    // Step 6 → Si NO pertenece a otra organización
    if (step === 6 && updatedData.belongs_other_org === false) {
      setLoading(true);
      try {
        const bodyFinal = {
          full_name: updatedData.full_name,
          email: updatedData.email,
          password: updatedData.password,
          phone: updatedData.phone,
          state_id: updatedData.state_id,
          municipality_id: updatedData.municipality_id,
          organisation_name:
            updatedData.organisation_name ||
            updatedData.other_organization ||
            null,
          belongsSabOrg: updatedData.belongsSabOrg,
          belongs_other_org: updatedData.belongs_other_org,
        };

        console.log("📤 Enviando al backend:", bodyFinal);

        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyFinal),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Registration failed");
        }

        alert("Verification code sent to your email");
        setStep(8);
        console.log("7. Después del setStep");
      } catch (err) {
        console.error("REGISTER ERROR:", err);
        alert(err.message);
      }
      setLoading(false);
      return;
    }

    if (step === 4) {
      if (updatedData.belongsSabOrg === true) {
        setStep(5); // Va a Step 5 si selecciona "Sí"
      } else {
        setStep(6); // Va a Step 6 si selecciona "No"
      }
      return;
    }

    if (step === 5) {
      setLoading(true);
      try {
        const bodyFinal = {
          full_name: updatedData.full_name,
          email: updatedData.email,
          password: updatedData.password,
          phone: updatedData.phone,
          state_id: updatedData.state_id,
          municipality_id: updatedData.municipality_id,
          organisation_name:
            updatedData.organisation_name ||
            updatedData.other_organization ||
            null,
          belongsSabOrg: updatedData.belongsSabOrg,
          belongs_other_org: updatedData.belongs_other_org,
        };

        console.log("📤 Enviando al backend:", bodyFinal);

        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyFinal),
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Registration failed");

        alert("Verification code sent to your email");
        setStep(8);
      } catch (err) {
        console.error("REGISTER ERROR:", err);
        alert(err.message);
      }
      setLoading(false);
      return;
    }

    // Step final → Enviar registro al backend
    if (step === 7) {
      setLoading(true);
      try {
        const bodyFinal = {
          full_name: updatedData.full_name,
          email: updatedData.email,
          password: updatedData.password,
          phone: updatedData.phone,
          state_id: updatedData.state_id,
          municipality_id: updatedData.municipality_id,
          organisation_name:
            updatedData.organisation_name ||
            updatedData.other_organization ||
            null,
          belongsSabOrg: updatedData.belongsSabOrg,
          belongs_other_org: updatedData.belongs_other_org,
        };

        console.log("📤 Enviando al backend:", bodyFinal);

        const res = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyFinal),
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.error || "Registration failed");

        alert("Verification code sent to your email");
        setStep(8);
      } catch (err) {
        console.error("REGISTER ERROR:", err);
        alert(err.message);
      }
      setLoading(false);
      return;
    }
    setStep(step + 1);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <LoadingSvg size={400} pulse />
        </div>
      )}
      {step === 1 && <Step1 onNext={handleNext} />}

      {step === 2 && <Step2 onNext={handleNext} onBack={() => setStep(1)} />}

      {step === 3 && (
        <Step3
          onNext={handleNext}
          onBack={() => setStep(2)}
          selectedState={data.state_id}
        />
      )}

      {step === 4 && <Step4 onNext={handleNext} onBack={() => setStep(3)} />}
      {step === 5 && <Step5 onNext={handleNext} onBack={() => setStep(4)} />}
      {step === 6 && <Step6 onNext={handleNext} onBack={() => setStep(4)} />}

      {step === 7 && data.belongs_other_org && (
        <Step7 onNext={handleNext} onBack={() => setStep(6)} />
      )}

      {step === 8 && (
        <EmailVerification
          email={data.email}
          onVerify={(token) => {
            alert("Email verified successfully!");
            navigate("/predashboard");
            // aquí puedes avanzar al dashboard, step 9, etc.
          }}
        />
      )}
    </>
  );
}
