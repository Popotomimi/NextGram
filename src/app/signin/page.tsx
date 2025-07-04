import { signIn, providerMap } from "auth";

import { BsGoogle } from "react-icons/bs";

const icons = [{ name: "Google", icon: <BsGoogle /> }];

const SingnInPage = async () => {
  const findIcon = (name: string) => {
    const icon = icons.find((item) => item.name === name);
    return icon?.icon ?? "";
  };

  return (
    <div className="w-[90%] sm:w-2/3 lg:w-1/2 mx-auto my-10 px-4 flex flex-col items-center text-white animate-fade-in">
      <div className="bg-gray-800 rounded-xl p-8 shadow-xl w-full">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 leading-snug">
          Acesse ou crie sua conta com uma das opções disponíveis
        </h2>

        {Object.values(providerMap).map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
            className="mt-6 flex justify-center">
            <button className="w-full sm:w-auto h-12 px-4 py-2 font-medium border border-zinc-600 flex items-center justify-center gap-3 rounded-lg bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300">
              {findIcon(provider.name)}
              <span className="text-sm sm:text-base">
                Entrar com <strong>{provider.name}</strong>
              </span>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default SingnInPage;
