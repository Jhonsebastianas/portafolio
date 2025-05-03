import PhoneInput from "react-phone-input-2";

const InputPhone = ({ placeholder, country = "co", value, onChange }) => {
  return (
    <PhoneInput
      placeholder={placeholder}
      country={country}
      value={value}
      onChange={(phone) => onChange(phone)}
      inputStyle={{
        width: "100%",
        height: "48px",
        fontSize: "1rem",
        color: "black",
        border: "none",
        borderRadius: "4px",
      }}
      buttonStyle={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        border: "none",
      }}
      dropdownStyle={{
        backgroundColor: "#333",
        color: "white",
      }}
      containerStyle={{ flex: 1 }}
      inputProps={{
        name: "phone",
        required: true,
      }}
    />
  );
};

export default InputPhone;
