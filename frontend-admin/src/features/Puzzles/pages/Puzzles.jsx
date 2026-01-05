import { useEffect, useState } from 'react';
import Button from '../../../components/Button'
import { cn } from '../../../lib/utils';
import CreateUpdatePuzzlesModal from '../components/CreateUpdatePuzzles';
import { useDispatch, useSelector } from 'react-redux';
import TableGrid from '../../../components/table/TableGrid';
import { HeaderType } from '../../../utils/types';
import TooltipWrapper from '../../../components/TooltipWrapper';
import EditIcon from '../../../components/svgs/EditIcon';
import DeleteIcon from '../../../components/svgs/DeleteIcon';
import { getPuzzles, deletePuzzle } from '../../../slices/PuzzlesSlice';
import { formatDateToReadable } from '../../../utils/common';
import { toast } from 'react-hot-toast';
import { ConfirmationModal } from '../../../components/ConfirmationModal';

const Puzzles = () => {
    const [openPuzzleModal, setOpenPuzzleModal] = useState(false);
    const [editPuzzle, setEditPuzzle] = useState(null);
    const [deletePuzzleId, setDeletePuzzleId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const { getPuzzlesApi } = useSelector(state => state.puzzles);
    const dispatch = useDispatch();
    const puzzles = getPuzzlesApi?.data?.response?.docs?.map((p) => ({
        ...p, 
        createdAt: !p.createdAt ? "N/A" : formatDateToReadable(p.createdAt, false, true), 
        updatedAt: !p.updatedAt ? "N/A" : formatDateToReadable(p.updatedAt, false, true),
    })) || [];
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = getPuzzlesApi?.data?.response?.totalPages || 1;
    const totalRecords = getPuzzlesApi?.data?.response?.totalDocs || 0;
    const limit = getPuzzlesApi?.data?.response?.limit || 10;

    // console.log({ puzzles })

    useEffect(() => {
        dispatch(getPuzzles({ page: currentPage }))
    }, [dispatch, currentPage]);

    const handleEdit = (id) => {
        const puzzle = puzzles.find((p) => p._id === id);
        if (!puzzle) return;
        setEditPuzzle(puzzle);
        setOpenPuzzleModal(true);
    };

    const handleDeleteClick = (id) => {
        setDeletePuzzleId(id);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (!deletePuzzleId) return;
        try {
            await dispatch(deletePuzzle(deletePuzzleId)).unwrap();
            toast.success('Puzzle deleted successfully');
            setShowDeleteConfirm(false);
            setDeletePuzzleId(null);
            dispatch(getPuzzles({ page: currentPage }));
        } catch (error) {
            toast.error(error?.message || 'Failed to delete puzzle');
        }
    };

    const columns = [
        { value: "name", name: "Name", _class: "col-span-3" },
        { 
            value: "url", 
            name: "URL", 
            _class: "col-span-3",
            type: HeaderType.link,
            render: (row) => (
                <a 
                    href={row.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                >
                    {row.url}
                </a>
            )
        },
        { value: "createdAt", name: "Created At", _class: "col-span-2" },
        { value: "updatedAt", name: "Updated At", _class: "col-span-2" },
        {
            name: "Actions",
            value: "actions",
            _class: "col-span-2",
            type: HeaderType.dynamicAction,
            actions: [
                {
                    label: "Edit",
                    icon: (
                        <TooltipWrapper
                            content={"Edit Puzzle"}
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
                            content={"Delete Puzzle"}
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
                    <h1 className="text-2xl font-bold">Puzzle Management</h1>
                    <Button onClick={() => setOpenPuzzleModal(true)}>Create Puzzle</Button>
                </div>
                <TableGrid
                    data={puzzles}
                    columns={columns}
                    isCompressView={false}
                    isLoading={getPuzzlesApi.isLoading}
                    allowPagination={true}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    pageLimit={limit}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                />
            </div>
            {
                openPuzzleModal && <CreateUpdatePuzzlesModal 
                    onClose={() => {
                        setOpenPuzzleModal(false);
                        setEditPuzzle(null);
                    }} 
                    initialData={editPuzzle}
                    onSuccess={() => {
                        dispatch(getPuzzles({ page: currentPage }));
                    }}
                />
            }
            {
                showDeleteConfirm && <ConfirmationModal
                    onClose={() => {
                        setShowDeleteConfirm(false);
                        setDeletePuzzleId(null);
                    }}
                    onConfirm={handleDeleteConfirm}
                    title="Delete Puzzle"
                    content="Are you sure you want to delete this puzzle? This action cannot be undone."
                    primaryButtonName="Delete"
                />
            }
        </>
    )
}

export default Puzzles
