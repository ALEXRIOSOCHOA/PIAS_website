import { useState, useEffect } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import Step4 from "../components/Step4";
import Step5 from "../components/Step5";
import Step6 from "../components/Step6";
import Step7 from "../components/Step7";
import EmailVerification from "../components/EmailVerification";

export default function Registration() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [userTypes, setUserTypes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/user-types")
      .then((res) => res.json())
      .then(setUserTypes)
      .catch((err) => console.error("Error fetching user types:", err));
  }, []);

  const handleNext = async (formData) => {
    const updatedData = { ...data, ...formData };
    setData(updatedData);

    // Step 6 → Si NO pertenece a otra organización
    if (step === 6 && updatedData.belongs_other_org === false) {
      setStep(8);
      return;
    }

    if (step === 4) {
      if (updatedData.belongsOtherOrg === true) {
        setStep(5); // Va a Step 5 si selecciona "Sí"
      } else {
        setStep(6); // Va a Step 6 si selecciona "No"
      }
      return;
    }

    // Step final → Enviar registro al backend
    if (step === 7 || (step === 6 && updatedData.belongs_other_org === false)) {
      try {
        const bodyFinal = {
          full_name: updatedData.full_name,
          email: updatedData.email,
          password: updatedData.password,
          phone: updatedData.phone,
          type_id: updatedData.type_id,
          state_id: updatedData.state_id,
          municipality_id: updatedData.municipality_id,
          belongs_other_org: updatedData.belongs_other_org,
          organisation_name: updatedData.organisation_name || null,
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
      return;
    }

    setStep(step + 1);
  };

  return (
    <>
      {step === 1 && <Step1 onNext={handleNext} userTypes={userTypes} />}

      {step === 2 && <Step2 onNext={handleNext} onBack={() => setStep(1)} />}

      {step === 3 && (
        <Step3
          onNext={handleNext}
          onBack={() => setStep(2)}
          selectedState={data.state_id}
        />
      )}

      {step === 4 && <Step4 onNext={handleNext} onBack={() => setStep(3)} />}
      {step === 5 && (
        <Step5 onNext={handleNext} onBack={() => setStep(4)}/>
      )}
      {step === 6 && <Step6 onNext={handleNext} onBack={() => setStep(4)} />}

      {step === 7 && data.belongs_other_org && (
        <Step7 onNext={handleNext} onBack={() => setStep(6)} />
      )}

      {step === 8 && (
        <EmailVerification
          email={data.email}
          onVerify={async (code) => {
            const res = await fetch("http://localhost:5000/api/auth/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: data.email, code }),
            });

            const result = await res.json();
            if (res.ok) {
              alert("Email verified successfully!");
            } else {
              alert(result.error || "Verification failed");
            }
          }}
        />
      )}
    </>
  );
}
