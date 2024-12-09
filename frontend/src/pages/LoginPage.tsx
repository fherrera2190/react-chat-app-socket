import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import AuthContext from "../auth/AuthContext";
import Swal from "sweetalert2";

interface FormState {
  email: string;
  password: string;
  rememberme: boolean;
}

const initialFormState = {
  email: "",
  password: "",
  rememberme: false,
};

export const LoginPage = () => {
  const [form, setForm] = useState<FormState>(initialFormState);

  const { login } = useContext(AuthContext);

  const allOk = () => {
    return form.email.length > 0 && form.password.length > 0 ? true : false;
  };

  const onChage = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onToggle = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.rememberme) {
      localStorage.setItem("email", form.email);
    } else {
      localStorage.removeItem("email");
    }

    const { email, password } = form;

    const resp = await login(email, password);

    if (!resp.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resp.msg,
      });
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      setForm({
        ...form,
        email,
        rememberme: true,
      });
    }
  }, []);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="login100-form validate-form flex-sb flex-w"
      >
        <span className="login100-form-title mb-3">Chat - Ingreso</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChage}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChage}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col" onClick={onToggle}>
            <input
              className="input-checkbox100"
              type="checkbox"
              name="rememberme"
              checked={form.rememberme}
              readOnly
            />
            <label className="label-checkbox100">Recordarme</label>
          </div>

          <div className="col text-right">
            <Link to="/auth/register" className="txt1">
              Nueva cuenta?
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button
            type="submit"
            className="login100-form-btn"
            disabled={!allOk()}
          >
            Ingresar
          </button>
        </div>
      </form>
    </>
  );
};
