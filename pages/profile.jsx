import React from "react";
import HeroSection from "../components/HeroSection";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../Slices/paymentSlice";
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../utils/error";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const ProfileUpdate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const updatedUser = useSelector((state) => state.paymentSlice.updatedUser);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  console.log(updatedUser);
  console.log(session);
  const submitHandler = async (data, e) => {
    console.log(data, e);
    try {
      dispatch(updateProfile(data));

      if (updatedUser) {
        // await signOut();
        const { email, password } = updatedUser;
        console.log(email, password);
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        toast.success("you just updated your profile");
        if (result.error) {
          toast.error(getError(result.error));
        }
        router.push("/");
      }
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    <Layout title='profile update'>
      <ToastContainer position='bottom-center' />
      <HeroSection title='profile' />
      <h4 className='min-w-full px-64 mt-8 '>Update Profile</h4>
      <form
        className='min-w-full px-64 pb-16 mt-4'
        onSubmit={(e) => handleSubmit(submitHandler)(e)}
      >
        <div className='flex flex-col mb-4'>
          <label htmlFor='name'>Full Name</label>
          <input
            id='name'
            type='text'
            {...register("name", { required: "Please enter your name" })}
          />
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            {...register("email", {
              required: "Please enter an email address",
              pattern: {
                value: "/^[w-.]+@([w-]+.)+[w-]{2,4}$/g",
              },
            })}
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='text'
            {...register("password", {
              required: "please enter your password",
              minLength: {
                value: 6,
                message: "password must be greater than 5 chars",
              },
            })}
          />
          {errors.password && (
            <p className='text-red-500'>{errors.password.message}</p>
          )}
        </div>
        <div className='flex flex-col mb-4'>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <input
            id='confirm_password'
            type='text'
            {...register("confirm_password", {
              required: "please enter your password again",
              validate: (value) => {
                if (value !== getValues("password"))
                  return "passwords do not match";
              },

              minLength: {
                value: 6,
                message: "passwords must be greater than 5 chars",
              },
            })}
          />
          {errors.confirm_password && (
            <p className='text-red-500'>{errors.confirm_password.message}</p>
          )}
        </div>
        <div className='flex flex-col mb-4 items-start '>
          <label htmlFor='image' className='font-semibold'>
            Image
          </label>
          <input
            id='image'
            type='file'
            className='border-none px-0 pt-0 active:border-none w-3/10 focus:ring-0'
            {...register("image", {
              required: "please select an image for upload",
            })}
          />
          {errors.image && (
            <p className='text-red-500'>{errors.image.message}</p>
          )}
        </div>

        <button className='primary-button'>Submit</button>
      </form>
    </Layout>
  );
};

export default ProfileUpdate;

ProfileUpdate.auth = true;
