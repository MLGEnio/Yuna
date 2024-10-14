'use client'

import { Href } from "@/Constants";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "@/graphql/mutation";  

type Inputs = {
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  termsConditions: Boolean
}

const RegisterForm = () => {
    // Set up form handling with react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

    // Use Apollo Client's useMutation hook
    const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

    // Form submit handler
    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
      try {
        // Call the mutation and pass the form data
        await signup({
          variables: {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
          }
        });
        alert('User registered successfully');
      } catch (err) {
        console.error('Error registering user:', err);
      }
    };

  return (
    <Form className="form-horizontal auth-form" onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <input required {...register("username")} className="form-control" placeholder="Username" id="exampleInputEmail12" />
        {errors.username && <span>This field is required</span>}
      </FormGroup>
      <FormGroup>
        <input required {...register("email")} type="email" className="form-control" placeholder="Email" id="exampleinputEmail12" />
        {errors.email && <span>This field is required</span>}
      </FormGroup>
      <FormGroup>
        <input required {...register("password")} type="password" className="form-control" placeholder="Password" />
        {errors.password && <span>This field is required</span>}
      </FormGroup>
      <FormGroup>
        <input required {...register("confirmPassword")} type="password" className="form-control" placeholder="Confirm Password" />
        {errors.confirmPassword && <span>This field is required</span>}
      </FormGroup>
      <div className="form-terms">
        <div className="custom-control custom-checkbox me-sm-2">
          <Label className="d-block">
            <input {...register("termsConditions")} className="checkbox_animated" id="chk-ani2" type="checkbox" />I agree all statements in{" "}
            <span>
              <a href={Href}>Terms &amp; Conditions</a>
            </span>
          </Label>
        </div>
      </div>
      <div className="form-button">
        <Button color="primary" type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
        {data && <p>Success! Welcome {data.signup.username}</p>}
      </div>
    </Form>
  );
};

export default RegisterForm;
