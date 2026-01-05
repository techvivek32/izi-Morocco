import Modal from '../../../components/Modal'
import CommonInput from '../../../components/form/CommonInput'
import Button from '../../../components/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createPuzzle, updatePuzzle, resetApiStateFromPuzzle } from '../../../slices/PuzzlesSlice';
import useApiResponseHandler from '../../../hooks/useApiResponseHandler';
import SpinnerIcon from '../../../components/svgs/SpinnerIcon';
import { useEffect } from 'react';

const CreateUpdatePuzzlesModal = ({ open = true, onClose, initialData = null, onSuccess }) => {
    const isEditing = Boolean(initialData);

    const form = useForm({
        defaultValues: {
            name: '',
            url: '',
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
    const { createPuzzleApi, updatePuzzleApi } = useSelector(state => state.puzzles);

    // Populate form when editing
    useEffect(() => {
        if (initialData) {
            reset({
                name: initialData.name || '',
                url: initialData.url || '',
            });
        }
    }, [initialData, reset]);

    const onSubmit = async (data) => {
        // console.log("form submitted", data);
        
        // Validation
        if (data.name.trim() === "") {
            setError("name", { type: "manual", message: "Puzzle name is required" });
            return;
        }
        if (data.url.trim() === "") {
            setError("url", { type: "manual", message: "URL is required" });
            return;
        }

        if (isEditing) {
            dispatch(updatePuzzle({ id: initialData._id, data }));
        } else {
            dispatch(createPuzzle(data));
        }
    }

    useApiResponseHandler({
        status: isEditing ? updatePuzzleApi.status : createPuzzleApi.status,
        data: isEditing ? updatePuzzleApi.data : createPuzzleApi.data,
        error: isEditing ? updatePuzzleApi.error : createPuzzleApi.error,
        resetForm: () => reset({ name: "", url: "" }),
        resetReduxStatus: () => dispatch(resetApiStateFromPuzzle(isEditing ? "updatePuzzleApi" : "createPuzzleApi")),
        setFormError: setError,
        sideAction: () => { 
            onSuccess && onSuccess();
            onClose && onClose();
        }
    });

    return (
        <Modal
            open={open}
            onOpenChange={onClose}
            title={
                <span className=" text-2xl">
                    {isEditing ? `Edit Puzzle${initialData?.name ? ` — ${initialData.name}` : ''}` : 'Create Puzzle'}
                </span>
            }
            contentClassName="min-w-[90%] lg:min-w-[840px] max-h-[85vh] overflow-y-auto overflow-x-clip"
            className="overflow-y-scroll scrollbar-hide text-blue min-h-[200px]"
            showClose
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className='p-4 flex flex-col gap-4 items-end'>
                <CommonInput
                    labelName="Puzzle Name"
                    id={`name`}
                    name={`name`}
                    register={register}
                    required
                    errors={errors}
                />

                <CommonInput
                    labelName="URL"
                    id={`url`}
                    name={`url`}
                    type="url"
                    register={register}
                    required
                    errors={errors}
                    placeholder="https://example.com"
                />

                <Button type="submit" className='w-fit'>
                    {isEditing ? 'Update' : 'Create'} 
                    {(createPuzzleApi.isLoading || updatePuzzleApi.isLoading) && <SpinnerIcon />}
                </Button>
            </form>
        </Modal>
    )
}

export default CreateUpdatePuzzlesModal
