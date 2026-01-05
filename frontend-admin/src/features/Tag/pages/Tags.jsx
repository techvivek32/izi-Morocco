import { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { cn } from '../../../lib/utils';
import CreateUpdateTagModal from '../modals/CreateUpdateTagModal';
import { useDispatch, useSelector } from 'react-redux';
import TableGrid from '../../../components/table/TableGrid';
import { HeaderType } from '../../../utils/types';
import TooltipWrapper from '../../../components/TooltipWrapper';
import EditIcon from '../../../components/svgs/EditIcon';
import DeleteIcon from '../../../components/svgs/DeleteIcon';
import { getTags ,deleteTag } from '../../../slices/tagSlice';
import { formatDateToReadable } from '../../../utils/common';
import { toast } from 'react-hot-toast';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

const Tags = () => {
    const [openTagModal, setOpenTagModal] = useState(false);
    const [editTag, setEditTag] = useState(null);
    const [deleteTagId, setDeleteTagId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const { getTagsApi, deleteTagApi } = useSelector(state => state.tag);
    const dispatch = useDispatch();
    const tags = getTagsApi?.data?.response?.docs?.map((t) => ({
        ...t, createdAt: !t.createdAt ? "N/A" : formatDateToReadable(t.createdAt, false, true), updatedAt: !t.updatedAt ? "N/A" : formatDateToReadable(t.updatedAt, false, true),
        manualEntry: t.manualEntry ? "Manual" : "Auto"
    })) || [];
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = getTagsApi?.data?.response?.totalPages || 1;
    const totalRecords = getTagsApi?.data?.response?.totalDocs || 0;
    const limit = getTagsApi?.data?.response?.limit || 10;

    // console.log({ tags })

    useEffect(() => {
        dispatch(getTags({ page: currentPage }))
    }, [dispatch, currentPage]);

    const handleEdit = (id) => {
        const tag = tags.find((t) => t._id === id);
        if (!tag) return;
        setEditTag(tag);
        setOpenTagModal(true);
    };

    const handleDeleteClick = (id) => {
        setDeleteTagId(id);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTagId) return;
        try {
            await dispatch(deleteTag(deleteTagId)).unwrap();
            toast.success('Tag deleted successfully');
            setShowDeleteConfirm(false);
            setDeleteTagId(null);
            dispatch(getTags({ page: currentPage }));
        } catch (error) {
            toast.error(error?.message || 'Failed to delete tag');
        }
    };

    const columns = [
        { value: "name", name: "Name", _class: "col-span-2" },
        { value: "manualEntry", name: "Entry", _class: "col-span-2" },
        { value: "createdAt", name: "Created At", _class: "col-span-2" },
        { value: "updatedAt", name: "Updated At", _class: "col-span-2" },
        {
            name: "Actions",
            value: "actions",
            type: HeaderType.dynamicAction,
            actions: [
                {
                    label: "Edit",
                    icon: (
                        <TooltipWrapper
                            content={"Edit Tag"}
                            place="right"
                            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
                        >
                            <EditIcon />
                        </TooltipWrapper>
                    ),
                    onClick: (row) => handleEdit(row._id),
                },
                {
                    label: "Delete",
                    icon: (
                        <TooltipWrapper
                            content={"Delete Tag"}
                            place="right"
                            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent/10 cursor-pointer"
                        >
                            <DeleteIcon />
                        </TooltipWrapper>
                    ),
                    onClick: (row) => handleDeleteClick(row._id),
                },
            ],
        },
    ];



    return (
        <>
            <div className='common-page flex flex-col gap-4'>
                <div
                    className={cn(
                        "common-page",
                        "flex flex-row justify-between items-center"
                    )}
                >
                    <h1 className="text-2xl font-bold">Tag Management</h1>
                    <Button onClick={() => setOpenTagModal(true)}>Create Tag</Button>
                </div>
                <TableGrid
                    data={tags}
                    columns={columns}
                    isCompressView={false}
                    isLoading={getTagsApi.isLoading}
                    allowPagination={true}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    pageLimit={limit}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                />
            </div>
            {
                openTagModal && <CreateUpdateTagModal 
                    onClose={() => {
                        setOpenTagModal(false);
                        setEditTag(null);
                    }} 
                    initialData={editTag}
                />
            }
            {
                showDeleteConfirm && <ConfirmationModal
                    onClose={() => {
                        setShowDeleteConfirm(false);
                        setDeleteTagId(null);
                    }}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Tag"
                    content="Are you sure you want to delete this tag? This action cannot be undone."
                    primaryButtonName="Delete"
                />
            }
        </>
    )
}

export default Tags
