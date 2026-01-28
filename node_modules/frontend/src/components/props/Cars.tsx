type CarsProps = {
  logo: string;
  name: string;
  image: string;
};

export function Cars({ logo, name, image }: CarsProps) {
  return (
    <>
      <div>
        <img src={image}></img>
        <div>
          <img src={logo}></img>
          <h3>{name}</h3>
        </div>
      </div>
    </>
  );
}
