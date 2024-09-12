import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InstanceAxios } from "../api/instanceAxios";

function UserManagement() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    reset(customer);
    setIsModalOpen(true);
  };

  const handleUpdate = async (formData) => {
    try {
      await InstanceAxios.put(`/customer/${selectedCustomer.id}`, formData);
      console.log("Güncelleme başarılı");
      const updatedData = data.map((customer) =>
        customer.id === selectedCustomer.id
          ? { ...customer, ...formData }
          : customer
      );
      setData(updatedData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Güncelleme hatası", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await InstanceAxios.delete(`/customer/${id}`);
      console.log("Silme işlemi tamamlandı");
      const updateData = data.filter((customer) => customer.id !== id);
      setData(updateData);
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const fetchData = async (filterType = "", filterValue = "") => {
    try {
      let url = "customer";
      if (filterType && filterValue) {
        url = `customer/${filterType}/${filterValue}`;
      }
      const response = await InstanceAxios.get(url);
      const responseData = Array.isArray(response.data)
        ? response.data
        : [response.data];
      console.log(responseData);
      setData(responseData);
    } catch (error) {
      console.log("Response error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    if (filterType && filterValue) {
      fetchData(filterType, filterValue);
    }
  };

  if (!data || data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleFilterSubmit} className="flex mb-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-4 py-2 mr-2"
          >
            <option value="">Filter by</option>
            <option value="email">Email</option>
            <option value="region">Region</option>
            <option value="name">Name</option>
            <option value="registrationDate">Registration Date</option>
          </select>

          <input
            type="text"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            placeholder="Filter value"
            className="border px-4 py-2 mr-2"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Filter
          </button>
        </form>
      </div>

      {/* Scrollable Customer List */}
      <main
        className="border-2 overflow-y-auto"
        style={{ maxHeight: "400px" }} // 400px olarak ayarlanmış maks yükseklik, 5 kullanıcıyı barındıracak şekilde ayarlanabilir
      >
        {data?.map((customer, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between border-b p-4"
          >
            <div className="flex-1 w-full md:w-auto md:flex">
              <p className="w-full md:w-auto md:flex-1">
                Ad: {customer.firstName} {customer.surname}
              </p>
              <p className="w-full md:w-auto md:flex-1">
                Email: {customer.email}
              </p>
              <p className="w-full md:w-auto md:flex-1">
                Region: {customer.region}
              </p>
              <p className="w-full md:w-auto md:flex-1">
                Registration Date: {customer.registrationDate}
              </p>
            </div>

            <div className="flex mt-2 md:mt-0">
              <button
                onClick={() => handleEdit(customer)}
                className="bg-blue-500 text-white px-4 py-2 m-1 rounded"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(customer.id)}
                className="bg-red-500 text-white px-4 py-2 m-1 rounded"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Müşteriyi Düzenle</h2>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <div className="mb-4">
                <label>First Name</label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="border px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label>Last Name</label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="border px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label>Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="border px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label>Region</label>
                <input
                  type="text"
                  {...register("region")}
                  className="border px-4 py-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Kaydet
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 ml-2 rounded"
              >
                İptal
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserManagement;
