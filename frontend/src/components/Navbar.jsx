import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar  pr-10 bg-fuchsia-500">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Book List Mern</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to={"/"}
              className="text-white font-bold hover:bg-white hover:text-fuchsia-500"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
