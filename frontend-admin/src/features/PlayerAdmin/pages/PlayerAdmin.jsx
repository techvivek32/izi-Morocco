import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import { cn } from "../../../lib/utils";
import { useEffect, useState } from "react";
import { getPlayer } from "../../../slices/playerSlice";
import TableGrid from "../../../components/table/TableGrid";
import CreatePlayerModal from "../modals/CreatePlayerModal";

const PlayerAdmin = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { getPlayerApi } = useSelector((state) => state.player);
  const { data, isLoading } = getPlayerApi;
  const [openModal, setOpenModal] = useState(false);

  const columns = [
    { value: "name", name: "Player Name" },
    { value: "email", name: "Player Email", _class: "col-span-2" },
  ];

  const playerList =
    data?.response?.data?.map((a) => {
      return {
        ...a,
      };
    }) || [];

  const totalPages = data?.response?.totalPages || 1;
  const totalRecords = data?.response?.totalDocs || 0;
  const limit = data?.response?.limit || 10;

  // console.log({ playerList });

  useEffect(() => {
    dispatch(getPlayer({ page: currentPage }));
  }, [dispatch, currentPage]);

  return (
    <>
      <div className="common-page flex flex-col gap-4">
        <div
          className={cn(
            "common-page",
            "flex flex-row justify-between items-center"
          )}
        >
          <h1 className="text-2xl font-bold">Player Admin</h1>
          <Button onClick={() => setOpenModal(true)}>Create Player</Button>
        </div>

        <TableGrid
          data={playerList}
          columns={columns}
          isCompressView={false}
          isLoading={isLoading}
          allowPagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          pageLimit={limit}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
      {openModal && (
        <CreatePlayerModal
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
};

export default PlayerAdmin;
