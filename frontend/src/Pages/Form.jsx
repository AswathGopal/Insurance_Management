import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSearchParams } from "react-router-dom";

const Form = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    reason: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const [search_id, setid] = useSearchParams();
  const [search_plan, setplan] = useSearchParams();
  const id = search_id.get("id");
  const plan = search_plan.get("plan");
   
  useEffect(() => {
    axios
      .post("http://localhost:8000/verify", { token: Cookies.get("token") })
      .then((result) => {
        if (result.data.Status != "ok") navigate("/");
      })
      .then((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    if (!values.name || !values.email || !values.age || !values.reason) {
      alert("All fields are required.");
      return;
    }

    try {
      const result = await axios.post("http://localhost:8000/auth/claim", {
        id: parseInt(id),
        plan: plan,
        token: Cookies.get("token"),
      });
      console.log(result);
      if (result.data.status) {
        console.log(result);
        alert(result.data.message);
        localStorage.setItem("valid", true);
      } else {
        alert(result.data.message);
        setError(result.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-3 w-1/2 border rounded">
        <div className="text-warning">{error && error}</div>
        <h2 className="flex justify-center text-xl font-bold">Claim Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="font-semibold text-lg" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border rounded w-full py-1 px-2 font-normal"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold text-lg" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded w-full py-1 px-2 font-normal"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="font-semibold text-lg" htmlFor="age">
              Age:
            </label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="border rounded w-full py-1 px-2 font-normal"
              value={values.age}
              onChange={(e) => setValues({ ...values, age: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="font-semibold text-lg" htmlFor="address">
              Reason for claiming insurance
            </label>
            <textarea
              name="address"
              placeholder="Address"
              className="border rounded w-full py-1 px-2 font-normal"
              value={values.reason}
              onChange={(e) => setValues({ ...values, reason: e.target.value })}
            ></textarea>
          </div>
          <button
            className="btn btn-success w-full rounded-0 mb-2 bg-blue-500 text-white py-2 px-4"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
