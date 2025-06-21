import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getallcategory } from "../../services/opreation/categoryAPI";

const Navbar = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      const toastId = toast.loading("Please Wait..");
      try {

        const response = await getallcategory()

        if(response){
            setCategory(response.data);
            toast.success("Category Listed")
        }

      } catch (err) {
        console.log(err);
        toast.error(err);
      }
      toast.dismiss(toastId);
      setLoading(false);
    };

    fetchCategory();
  }, []);


  return <div className="bg-red-800">Navbar</div>;
};

export default Navbar;
