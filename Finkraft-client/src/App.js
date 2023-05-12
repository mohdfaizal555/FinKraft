import { useEffect, useState } from "react";
import Table from "./components/Table";
import Head from "./components/Head";
import Footer from "./components/Footer";
import axios from "axios";

// Inline css has been used throughout the Application, later can integrate to external file or 
// use CSS frameworks(TailwindCSS,ChakraUI etc..)

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(8);
  const [currentRecords, setCurrentRecords] = useState([]);

  const showEntries = data.length;
  let indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  useEffect(() => {
    getUserDetails();
  }, []);

   //Calling API to get all the users information using axios.
   //Can integrate by adding loading state etc.. 

  const getUserDetails = async () => {
    const result = await axios.get("http://localhost:5000/api/get");
    try {
      setData(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  // To display 8 users on every currentPage
  useEffect(() => {
    const lists = data.slice(indexOfFirstRecord, indexOfLastRecord);
    setCurrentRecords(lists);
  }, [currentPage, data, recordsPerPage]);

  // Search functionality integrated on onChange
  useEffect(() => {

    const searchItem = (searchTerm) => {
      if(searchTerm === ""){
        return 
      }
      const filteredData = data.filter((item) =>
        item?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    };
    searchItem(searchTerm);
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // SORT functionality integrated on onClick 
  const handleSort = (type) => {
    const sortProperty = type.toLowerCase();
    let sorted = [];
    if (sortProperty === ("age" || "salary")) {
      sorted = [...data].sort((a, b) => a[sortProperty] - b[sortProperty]);
    } else {
      sorted = [...data].sort((a, b) =>
        a[sortProperty] > b[sortProperty]
          ? 1
          : b[sortProperty] > a[sortProperty]
          ? -1
          : 0
      );
    }
    setData(sorted);
    setCurrentPage(1);
  };

  return (
    <>
      <Head
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        showEntries={currentRecords.length}
        entryChange={(e) => setRecordsPerPage(e.target.value)}
        max={showEntries}
      />

      <Table data={currentRecords} handleSort={handleSort} />

      <Footer
        totalUsers={showEntries}
        startUser={indexOfFirstRecord}
        endUsers={
          indexOfLastRecord > showEntries ? showEntries : indexOfLastRecord
        }
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default App;
