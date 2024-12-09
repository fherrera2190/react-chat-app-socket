import { Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { ChangeEvent, useContext } from "react";
import AuthContext from "../auth/AuthContext";
import Swal from "sweetalert2";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

export const RegisterPage = () => {
  const { formState, onInputChange } = useForm(initialForm);
  const { register } = useContext(AuthContext);

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = formState;
    const resp = await register(name, email, password);

    if (!resp.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resp.msg,
      });
    }
  };
  const allOk = () => {
    return formState.email.length > 0 &&
      formState.password.length > 0 &&
      formState.name.length > 0
      ? true
      : false;
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="login100-form validate-form flex-sb flex-w"
      >
        <span className="login100-form-title mb-3"> Chat - Registro </span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={onInputChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onInputChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            onChange={onInputChange}
          />
          <span className="focus-input100"></span>
        </div>
        <div className="row mb-3">
          <div className="col text-right">
            <Link to="/auth/login" className="txt1">
              Ya tienes cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button
            type="submit"
            className="login100-form-btn"
            disabled={!allOk()}
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </>
  );
};
