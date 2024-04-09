import { message } from "antd";
import { useNavigate } from "react-router-dom";

// API
import { GetCurrentUser } from "../apicalls/user";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { SetUser } from "../redux/userSlice";


// eslint-disable-next-line react/prop-types
function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getpresentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();

      if (response.success) {
        dispatch(SetUser(response.data));
        dispatch(HideLoading());
        return
      }
        dispatch(SetUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      
    } catch (error) {
      dispatch(HideLoading());
      dispatch(SetUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getpresentUser(); 
 
    } else {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1 className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >Book My Show {user.isAdmin ? "(Admin)" : ""}</h1>
          </div>

          <div className="bg-white p-1 flex gap-1">
            <i className="ri-shield-user-line text-primary mt-1"></i>
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>

            <i
              className="ri-logout-box-r-line mt-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProtectedRoute;