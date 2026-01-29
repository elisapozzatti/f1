import "./Cars.css";

type CarsProps = {
  logo: string;
  name: string;
  image: string;
};

export function Cars({ logo, name, image }: CarsProps) {
  return (
    <>
      <div className="containerTeam">
        <img src={image} className="imageCar"></img>
        <div className="logoName">
          <img src={logo} className="logo"></img>
          <h3 className="name">{name}</h3>
        </div>
      </div>
    </>
  );
}
