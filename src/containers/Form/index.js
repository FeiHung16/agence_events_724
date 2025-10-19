import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => {
  setTimeout(resolve, 500);
});

const initialForm = {
  nom: "",
  prenom: "",
  type: "",
  email: "",
  message: "",
};

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  // Cette clé force le remount du form (utile si Field/Select sont non contrôlés)
  const [formKey, setFormKey] = useState(0);

  // handleChange tolérant à différentes signatures d'onChange
  const handleChange = (field, payload) => {
    // payload peut être un event (avec target.value) ou la valeur directement
    const value =
      payload && payload.target !== undefined ? payload.target.value : payload;
    // debug
    // console.log("handleChange", field, value);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      // debug: vérifier ce qu'on envoie
      // console.log("Envoi du formulaire:", formData);

      try {
        await mockContactApi();
        setSending(false);
        onSuccess();

        // 1) réinitialiser l'état contrôlé
        setFormData(initialForm);

        // 2) forcer remount pour réinitialiser les composants non contrôlés
        setFormKey((k) => k + 1);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, formData]
  );

  return (
    // Utilise formKey sur le conteneur racine pour forcer remount complet
    <form onSubmit={sendContact} key={formKey}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={(e) => handleChange("nom", e)}
            name="nom"
          />
          <Field
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={(e) => handleChange("prenom", e)}
            name="prenom"
          />
          <Select
            selection={["Personel", "Entreprise"]}
            // Select peut appeler onChange(value) ou onChange(event)
            onChange={(v) => handleChange("type", v)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            value={formData.type}
            name="type"
          />
          <Field
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e)}
            name="email"
          />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours..." : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="Message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(e) => handleChange("message", e)}
            name="message"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
