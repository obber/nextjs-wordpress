import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Input } from "./input";
import { useSubscribeMutation } from "../features/subscribe/mutations";

interface SubscribeFormFields {
  email: string;
}

export const Subscribe = () => {
  const subscribeMutation = useSubscribeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscribeFormFields>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const response = await subscribeMutation.mutateAsync({ email });
      if (response.success) {
        console.log("Redirect to thank you page");
      } else {
        throw new Error(response.message);
      }
    } catch (err: unknown) {
      console.error("Unable to subscribe to newsletter. err = ", err);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="py-28 flex flex-col lg:flex-row items-center">
        <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
          Sign up for the newsletter →
        </h3>
        <div className="lg:w-1/2 flex flex-col lg:flex-row justify-center items-start lg:pl-4 gap-8">
          <div className="flex-1">
            <Input
              {...register("email", {
                required: "An email address is required",
              })}
              placeholder="your@email.com"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </div>
          <Button type="submit">Subscribe</Button>
        </div>
      </div>
    </form>
  );
};
