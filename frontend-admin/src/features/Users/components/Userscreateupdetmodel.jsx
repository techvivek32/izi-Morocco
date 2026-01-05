  import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal';
import { createUser,getUserGroups, updateUser } from '../../../slices/usersSlice';
import Button from '../../../components/Button';
import { useState } from 'react';
import CommonInput from "../../../components/form/CommonInput";
import  Eyeopen from "../../../components/svgs/Eyeopen";
import Eyeclose from "../../../components/svgs/Eyeclose";

const UsersCreate = ({ open, onOpenChange, onCreated, initialData = null }) => {
  const dispatch = useDispatch();
  const { createUserApi, updateUserApi } = useSelector((s) => s.user || {});
  const { getUserGroupsApi } = useSelector((s) => s.user || {});


  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: { fullName: '', email: '', password: '', userGroupId: '' },
  });

  useEffect(() => {
    // handle create or update success
    if (createUserApi?.isSuccess || updateUserApi?.isSuccess) {
      reset();
      onOpenChange && onOpenChange(false);
      // prefer create data if present, otherwise call without data for update
      onCreated && onCreated(createUserApi?.data ?? updateUserApi?.data ?? null);
    }
  }, [createUserApi?.isSuccess, createUserApi?.data, updateUserApi?.isSuccess, updateUserApi?.data, onOpenChange, onCreated, reset]);

  // populate form when editing
  useEffect(() => {
    if (initialData) {
      reset({
        fullName: initialData.fullName ?? initialData.name ?? initialData.full_name ?? '',
        email: initialData.email ?? '',
        password: '',
        userGroupId: initialData.group?._id ?? initialData.userGroupId ?? initialData.groupId ?? '',
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    // fetch groups when modal opens
    if (open) {
      dispatch(getUserGroups());
    }
  }, [open, dispatch]);

  const isEditing = Boolean(initialData);

  const [changePassword, setChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // watch form values so we can detect if anything changed (for edit mode)
  const watched = watch();

  const initialNormalized = {
    fullName: initialData?.fullName ?? initialData?.name ?? initialData?.full_name ?? '',
    email: initialData?.email ?? '',
    userGroupId: initialData?.group?._id ?? initialData?.userGroupId ?? initialData?.groupId ?? '',
  };

  const currentValues = {
    fullName: watched.fullName ?? '',
    email: watched.email ?? '',
    userGroupId: watched.userGroupId ?? '',
    password: watched.password ?? '',
  };

  // Determine if any meaningful change was made when editing.
  let hasChanges = false;
  if (currentValues.fullName !== initialNormalized.fullName) hasChanges = true;
  if (currentValues.email !== initialNormalized.email) hasChanges = true;
  if (currentValues.userGroupId !== initialNormalized.userGroupId) hasChanges = true;
  if (changePassword && (currentValues.password && currentValues.password !== '')) hasChanges = true;

  // Normalize groups array from multiple possible API response shapes
  const _groupsRaw =
    getUserGroupsApi?.data?.docs ??
    getUserGroupsApi?.data?.response?.docs ??
    getUserGroupsApi?.data?.data?.docs ??
    getUserGroupsApi?.data ?? [];
  const groups = Array.isArray(_groupsRaw) ? _groupsRaw : [];

  // When editing and groups are loaded, ensure the user's current group is selected
  useEffect(() => {
    if (isEditing && groups.length > 0) {
      const groupId = initialNormalized.userGroupId || '';
      if (groupId) setValue('userGroupId', groupId);
    }
    // we intentionally only depend on groups length and isEditing/initialNormalized
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length, isEditing]);

  const [localError, setLocalError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const onSubmit = async (values) => {
    setLocalError(null);
    try {
      if (initialData) {
        // update — only send password if changePassword is true and a value was provided
        const payload = { ...values };
        if (!changePassword || payload.password === "") delete payload.password;

        // if user requested to change password but didn't provide one, block submit
        if (changePassword && !payload.password) {
          setLocalError('Please enter a new password to change it');
          return;
        }

        await dispatch(updateUser({ id: initialData._id ?? initialData.id, data: payload })).unwrap();
        onCreated && onCreated();
      } else {
        // create
        const created = await dispatch(createUser(values)).unwrap();
        onCreated && onCreated(created);
      }
      reset();
      onOpenChange && onOpenChange(false);
    } catch (err) {
      // err may be the rejected action payload or error
      setLocalError(err?.message ?? 'Failed to create user');
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? `Edit user${initialNormalized.fullName ? ` — ${initialNormalized.fullName}` : ''}` : 'Create user'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <CommonInput
          labelName="Full name"
          id="fullName"
          name="fullName"
          register={register}
          errors={{}}
          required
        />

        <CommonInput
          labelName="Email"
          id="email"
          name="email"
          type="email"
          register={register}
          errors={{}}
          required
        />

        {/* Show password input when creating, or when editing + toggled to change password */}
        {!isEditing ? (
          <div className="relative">
            <CommonInput
              labelName="Password"
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              errors={{}}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-3"
            >
              {showPassword ? <Eyeopen /> : <Eyeclose />}
            </button>
          </div>
        ) : (
          <div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={changePassword} onChange={(e) => setChangePassword(e.target.checked)} />
              <span>Change password</span>
            </label>
            {changePassword && (
              <div className="mt-2 relative">
                <CommonInput
                  labelName="New password"
                  id="password"
                  name="password"
                  type={showNewPassword ? "text" : "password"}
                  register={register}
                  errors={{}}
                  required
                />
                <button
                  type="button"
                  onClick={toggleNewPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none mt-3"
                >
                  {showNewPassword ? <Eyeopen /> : <Eyeclose />}
                </button>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">User group</label>
          <select {...register('userGroupId', { required: true })} className="w-full px-3 py-2 border rounded-md">
            <option value="">Select group</option>
            {groups.map((g) => (
              <option key={g._id} value={g._id}>{g.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="light" onClick={() => onOpenChange && onOpenChange(false)} className="px-4 py-2">Cancel</Button>
          <Button
            type="submit"
            disabled={isEditing ? (!hasChanges || updateUserApi?.isLoading) : createUserApi?.isLoading}
            className="px-4 py-2"
          >
            {isEditing ? (updateUserApi?.isLoading ? 'Updating...' : 'Update') : (createUserApi?.isLoading ? 'Creating...' : 'Create')}
          </Button>
        </div>

        {/* when editing show a hint if nothing changed */}
        {isEditing && !hasChanges && (
          <div className="text-sm text-gray-500">No changes to save</div>
        )}

        {(createUserApi?.isError || localError) && (
          <div className="text-sm text-red-600">{localError ?? createUserApi?.error?.message ?? 'Failed to create user'}</div>
        )}
      </form>
    </Modal>
  );
};

export default UsersCreate;
