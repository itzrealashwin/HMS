export default function SSubB({ Icon, heading, content }) {
  return (
      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-col items-center bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl text-[#2D6A4F] font-semibold gap-6 lg:gap-12">
              <div className="flex items-center justify-center w-24 h-24 lg:w-36 lg:h-36 bg-neonGreen rounded-full border-4 border-white shadow-lg">
                  {Icon && <Icon className="w-12 h-12 text-emerald-800" />}
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <h5 className="text-[#2D6A4F] font-bold text-xl lg:text-2xl mb-2">{heading}</h5>
                  <p className="mb-4">{content}</p>
                
              </div>
          </div>
      </div>
  );
}
