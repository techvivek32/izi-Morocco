import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableGrid from "../../../components/table/TableGrid";
import Button from "../../../components/Button";
import PlusIcon from "../../../components/svgs/PlusIcon";
import { HeaderType } from "../../../utils/types";
import EditIcon from "../../../components/svgs/EditIcon";
import {
  toggleGameStatus,
  getGameInfo,
  deleteGame,
  cloneGame,
  resetApiStateFromGames,
} from "../../../slices/gameSlice";
import DeleteIcon from "../../../components/svgs/DeleteIcon";
import { ConfirmationModal } from "../../../components/ConfirmationModal";
import TooltipWrapper from "../../../components/TooltipWrapper";
import SearchBox from "../../../components/SearchBox";

import toast from "react-hot-toast";
import useNavigateTo from "../../../hooks/useNavigateTo";
import { ROUTES } from "../../../routes/helper";
import useCooldown from "../../../hooks/useCooldown";
import useApiResponseHandler from "../../../hooks/useApiResponseHandler";
import DisabledWrapper from "../../../components/DisabledWrapper";
import CloneIcon from "../../../components/svgs/CloneIcon";
import { useResetMultipleApiStates } from "../../../hooks/useResetMultipleApiStates";

const Games = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state with comprehensive error handling
  const { getGameInfoApi, cloneGameApi } = useSelector((state) => state.games);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [togglingIds, setTogglingIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getGameInfo({ page: currentPage, searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  // Extract data from API response with safe fallbacks - correct structure
  const apiResponse = getGameInfoApi?.data?.response;
  const games = apiResponse?.docs || [];
  const isLoading = getGameInfoApi?.isLoading;

  const totalRecords = apiResponse?.totalDocs || 0;
  const totalPages = apiResponse?.totalPages || 1;
  const limit = apiResponse?.limit || 10;
  const goTo = useNavigateTo();
  const [saveCooldown, triggerSaveCooldown] = useCooldown(2000);

  const handleEdit = (id) => {
    goTo(ROUTES.UPDATE_GAME.replace(":id", id));
  };
  const handleDeleteClick = (game) => {
    setGameToDelete(game);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!gameToDelete) return;
    try {
      await dispatch(deleteGame(gameToDelete._id)).unwrap();
      toast.success("Game deleted successfully!");
      setDeleteModalOpen(false);
      setGameToDelete(null);
      // refresh list
      dispatch(getGameInfo({ page: currentPage, searchTerm }));
    } catch (err) {
      console.error("Delete game error:", err);
      toast.error("Failed to delete game");
    }
  };

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleNewGame = () => {
    navigate("/games/create");
  };

  const handleCloneClick = (id) => {
    triggerSaveCooldown();
    dispatch(cloneGame(id));
  };

  // Table columns configuration - focus on essential columns only
  const columns = [
    {
      value: "title",
      name: "Title",
      _class: "col-span-4",
    },
    {
      value: "thumbnail",
      name: "Thumbnail",
      _class: "col-span-1",
      type: HeaderType.icon,
    },
    {
      value: "language",
      name: "Language",
      _class: "col-span-2",
    },
    {
      value: "status",
      name: "Status",
      _class: "col-span-2",
      type: HeaderType.switch,
      togglingIds: togglingIds,
      onToggle: async (row, newValue) => {
        if (!row?._id) return;
        // add to loading set
        setTogglingIds((prev) => [...prev, row._id]);
        try {
          const desiredStatus = newValue ? "active" : "inactive";
          await dispatch(
            toggleGameStatus({ gameId: row._id, status: desiredStatus })
          ).unwrap();
          // refresh immediately to reflect server canonical state
          dispatch(getGameInfo({ page: currentPage, searchTerm }));
          toast.success("Game status updated");
          // keep the row frozen for 5 seconds to avoid rapid toggles or race conditions
          await new Promise((resolve) => setTimeout(resolve, 5000));
        } catch (err) {
          console.error("Toggle status error:", err);
          toast.error("Failed to update game status");
        } finally {
          setTogglingIds((prev) => prev.filter((id) => id !== row._id));
        }
      },
    },
    {
      name: "Actions",
      value: "actions",
      _class: "col-span-3",
      type: HeaderType.dynamicAction,
      actions: [
        {
          label: "Edit",
          icon: (
            <TooltipWrapper content="Edit">
              <span className="p-1 inline-flex items-center">
                <EditIcon className="cursor-pointer" />
              </span>
            </TooltipWrapper>
          ),
          onClick: (row) => handleEdit(row._id),
        },
        {
          label: "Delete",
          icon: (
            <TooltipWrapper content="Delete">
              <span className="p-1 inline-flex items-center text-red-600">
                <DeleteIcon className="cursor-pointer" />
              </span>
            </TooltipWrapper>
          ),
          onClick: (row) => handleDeleteClick(row),
        },
        {
          label: "Clone",
          icon: (
            <DisabledWrapper where={saveCooldown}>
              <TooltipWrapper
                content={"Clone Game"}
                place="right"
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-accent/10"
              >
                <CloneIcon className="cursor-pointer" />
              </TooltipWrapper>
            </DisabledWrapper>
          ),
          onClick: (row) => handleCloneClick(row._id),
        },
      ],
    },
  ];

  useApiResponseHandler({
    status: cloneGameApi.status,
    data: cloneGameApi.data,
    error: cloneGameApi.error,
    sideAction: () => {
      dispatch(getGameInfo({ page: currentPage }));
    },
  });

  useResetMultipleApiStates([
    { action: resetApiStateFromGames, stateName: "cloneGameApi" },
  ]);

  return (
    <div className="common-page flex flex-col gap-4">
      <div className="common-page flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Games List</h1>
        <Button onClick={handleNewGame}>
          <PlusIcon className="mr-2" />
          New Game
        </Button>
      </div>

      {/* Search Box */}
      <div className="w-full max-w-md">
        <SearchBox
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search games..."
          debounceMs={500}
        />
      </div>

      {getGameInfoApi.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">
            Error loading games: {getGameInfoApi.error}
          </p>
          <Button
            onClick={() =>
              dispatch(getGameInfo({ page: currentPage, searchTerm }))
            }
            className="mt-2 bg-red-600 hover:bg-red-700 text-white"
          >
            Retry
          </Button>
        </div>
      )}

      <TableGrid
        data={games}
        columns={columns}
        isCompressView={false}
        isLoading={isLoading}
        allowPagination={true}
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        pageLimit={limit}
        onPageChange={(newPage) => {
          setCurrentPage(newPage);
        }}
      />
      {deleteModalOpen && (
        <ConfirmationModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Game"
          content={
            gameToDelete
              ? `Are you sure you want to delete "${gameToDelete.title}"? This action cannot be undone.`
              : "Are you sure you want to delete this game?"
          }
          primaryButtonName="Delete"
        />
      )}
    </div>
  );
};

export default Games;
