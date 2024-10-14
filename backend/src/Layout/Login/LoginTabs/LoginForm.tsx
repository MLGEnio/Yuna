'use client'

import { useAppSelector } from "@/Redux/Hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { Eye, EyeOff } from "react-feather";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, InputGroup, InputGroupText, Label, Spinner } from "reactstrap";
import SocialMediaIcons from "./SocialMediaIcons";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutation";

type Inputs = {
  username: string,
  password: string
}

const LoginForm = () => {
  const { i18LangStatus } = useAppSelector((store) => store.LangReducer);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const router = useRouter();
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  // Form submit handler
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    try {
      const { data } = await login({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });

      if (data?.login?.token) {
        Cookies.set("token", data.login.token);  // Store actual token
        router.push(`${process.env.PUBLIC_URL}/${i18LangStatus}/dashboard`);
        toast.success("Login successful");
      } else {
        toast.error("Failed to get token. Please try again.");
      }
    } catch (err) {
      toast.error("Please enter valid email or password.");
      console.error('Error logging in:', err);
    }
  };

  const handlePasswordToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Form className="form-horizontal auth-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <input
          className="form-control"
          required
          {...register("username", { required: true })}
          placeholder="Username"
        />
        {errors.username && <span className="text-danger">Username is required</span>}
      </FormGroup>
      <FormGroup>
        <InputGroup>
          <input
            className="form-control"
            required
            {...register("password", { required: true })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <InputGroupText onClick={handlePasswordToggle} style={{ cursor: "pointer" }}>
            {showPassword ? <Eye /> : <EyeOff />}
          </InputGroupText>
        </InputGroup>
        {errors.password && <span className="text-danger">Password is required</span>}
      </FormGroup>
      <div className="form-terms">
        <div className="custom-control custom-checkbox me-sm-2">
          <Label className="d-block">
            <Input className="checkbox_animated" id="chk-ani2" type="checkbox" />
            Remember Me
            <span className="pull-right">
              <Button color="transparent" className="forgot-pass p-0">
                Forgot your password?
              </Button>
            </span>
          </Label>
        </div>
      </div>
      <div className="form-button">
        <Button color="primary" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner color="primary">Loading...</Spinner>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      {error && <p className="text-danger">Error: {error.message}</p>}
      <div className="form-footer">
        <span>Or login with social platforms</span>
        <SocialMediaIcons />
      </div>
    </Form>
  );
};

export default LoginForm;
