import Modal from "../../../components/Modal";
import CommonInput from "../../../components/form/CommonInput";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SpinnerIcon from "../../../components/svgs/SpinnerIcon";
import {
  createPlayer,
  getPlayer,
  resetApiStateFromPlayer,
} from "../../../slices/playerSlice";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";

const CreatePlayerModal = ({ open = true, onClose }) => {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  const { register, handleSubmit, formState, setError, reset } = form;
  const { errors } = formState;
  const dispatch = useDispatch();
  const { createPlayerApi } = useSelector((state) => state.player);

  const onSubmit = async (data) => {
    // console.log("form submitted", data);
    dispatch(createPlayer(data));
  };

  useApiResponseHandler({
    status: createPlayerApi.status,
    data: createPlayerApi.data,
    error: createPlayerApi.error,
    resetForm: () => reset({ name: "", email: "", password: "" }),
    resetReduxStatus: () =>
      dispatch(resetApiStateFromPlayer("createPlayerApi")),
    setFormError: setError,
    sideAction: () => {
      dispatch(getPlayer({ page: 1 }));
      onClose && onClose();
    },
  });

  return (
    <Modal
      open={open}
      onOpenChange={onClose}
      title={<span className="text-2xl">Create Player Admin</span>}
      contentClassName="min-w-[90%] lg:min-w-[840px] max-h-[85vh] overflow-y-auto overflow-x-clip"
      className="overflow-y-scroll scrollbar-hide text-blue min-h-[200px]"
      showClose
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="p-4 flex flex-col gap-4 items-end"
      >
        <CommonInput
          labelName="Name"
          id={`name`}
          name={`name`}
          register={register}
          required
          errors={errors}
        />

        <CommonInput
          labelName="Email"
          id={`email`}
          name={`email`}
          register={register}
          required
          errors={errors}
        />

        <CommonInput
          labelName="Password"
          id={`password`}
          name={`password`}
          register={register}
          required
          errors={errors}
        />

        <Button type="submit" className="w-fit">
          {"Create"}
          {createPlayerApi.isLoading && <SpinnerIcon />}
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePlayerModal;
