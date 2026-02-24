const Fuel = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/home/AKT.png')" }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center py-8 md:h-[720px]">
        <img src="/images/akashstar.svg" alt="Akash Star" className="h-12" />
        <div className="mt-5 flex flex-col md:gap-2">
          <h2 className="text-center text-2xl font-semibold leading-[50px] text-white md:text-5xl">
            <span className="font-instrument">AKT</span>:The Fuel Behind Akash
          </h2>
          <p className="px-6 text-center text-[#8c8e91]">
            AKT is the utility token that powers every GPU transaction on the
            Akash decentralized cloud.
          </p>
        </div>

        <a
          href="/token/"
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-[#333336] px-4 py-2 text-sm font-medium text-[#fafafa] transition-colors hover:bg-[#404044]"
        >
          Learn How AKT Works
        </a>
      </div>
    </section>
  );
};

export default Fuel;
