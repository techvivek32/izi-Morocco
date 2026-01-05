import Modal from '../../../components/Modal'
import CommonInput from '../../../components/form/CommonInput'
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, updateTag, getTags, resetApiStateFromTag } from '../../../slices/tagSlice';
import useApiResponseHandler from '../../../hooks/useApiResponseHandler';
import SpinnerIcon from '../../../components/svgs/SpinnerIcon';
import { useEffect } from 'react';

const CreateUpdateTagModal = ({ open = true, onClose, initialData = null }) => {
    const isEditing = Boolean(initialData);

    const form = useForm({
        defaultValues: {
            name: '',
        }
    });
    const {
        register,
        handleSubmit,
        formState,
        setError,
        reset,
    } = form;
    const { errors } = formState;
    const dispatch = useDispatch();
    const { createTagApi, updateTagApi } = useSelector(state => state.tag);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || '',
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data) => {
        // console.log("form submitted", data);
        if (data.name.trim() === "") {
            setError("name", { type: "manual", message: "Tag name is required" });
            return;
        }
        
        if (isEditing) {
            dispatch(updateTag({ id: initialData._id, data }));
        } else {
            dispatch(createTag(data));
        }
    }

    useApiResponseHandler({
        status: isEditing ? updateTagApi.status : createTagApi.status,
        data: isEditing ? updateTagApi.data : createTagApi.data,
        error: isEditing ? updateTagApi.error : createTagApi.error,
        resetForm: () => reset({ name: "" }),
        resetReduxStatus: () => dispatch(resetApiStateFromTag(isEditing ? "updateTagApi" : "createTagApi")),
        setFormError: setError,
        sideAction: () => { 
            dispatch(getTags());
            onClose && onClose();
        }
    });

    return (
        <Modal
            open={open}
            onOpenChange={onClose}
            title={
                <span className=" text-2xl">
                    {isEditing ? `Edit Tag${initialData?.name ? ` — ${initialData.name}` : ''}` : 'Create Tag'}
                </span>
            }
            contentClassName="min-w-[90%] lg:min-w-[840px] max-h-[85vh] overflow-y-auto overflow-x-clip"
            className="overflow-y-scroll scrollbar-hide text-blue min-h-[200px]"
            showClose
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='p-4 flex flex-col gap-4 items-end'>
                <CommonInput
                    labelName="Tag Name"
                    id={`name`}
                    name={`name`}
                    register={register}
                    required
                    errors={errors}
                />

                <Button type="submit" className='w-fit'>
                    {isEditing ? 'Update' : 'Create'} 
                    {(createTagApi.isLoading || updateTagApi.isLoading) && <SpinnerIcon />}
                </Button>
            </form>
        </Modal>
    )
}

export default CreateUpdateTagModal
