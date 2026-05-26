import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NearestShelter from "@/components/NearestShelter";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* ── SECTION 1: USER STORY ── */}
        <section id="story" className="min-h-screen flex flex-col justify-center items-center px-8 py-32 text-center">
          <p className="text-sm uppercase tracking-widest text-orange-400 mb-4">Why SafeSpot?</p>
          <h1 className="text-5xl font-bold mb-8 leading-tight max-w-3xl">
            In 2021, a deadly heatwave killed hundreds in Vancouver.
          </h1>
          <p className="text-gray-400 max-w-xl text-lg mb-4">
            [News article link — Vancouver heat dome, June 2021]
          </p>
          <p className="text-gray-300 max-w-2xl text-xl mb-6">
            Many victims lived near cooling centres — but had no way of knowing.
            If they had received a real-time alert and been guided to the nearest safe space,
            more lives could have been saved.
          </p>
          <p className="text-orange-400 text-lg font-medium">
            SafeSpot detects extreme heat in real time and routes you to the nearest cooling centre via GPS.
          </p>
        </section>

        {/* ── SECTION 2: ACTIVITY DIAGRAM ── */}
        <section id="how-it-works" className="min-h-screen flex flex-col justify-center items-center px-8 py-32 bg-zinc-950">
          <p className="text-sm uppercase tracking-widest text-orange-400 mb-4">How It Works</p>
          <h2 className="text-4xl font-bold mb-16">System Flow</h2>

          <div className="flex flex-col items-center gap-0 w-full max-w-sm">
            {[
              { icon: "🌡️", label: "Temperature Detected", sub: "Raspberry Pi Temperature Sensor" },
              { icon: "📍", label: "Location Identified", sub: "Browser GPS Location API" },
              { icon: "🚨", label: "Alert Triggered", sub: "Threshold Alert at 35°C+" },
              { icon: "🏛️", label: "Nearest Safe Space Found", sub: "Cooling Centre & Library Routing" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div className="border border-zinc-700 rounded-2xl px-8 py-5 text-center bg-zinc-900 w-full">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <div className="font-semibold text-white">{step.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{step.sub}</div>
                </div>
                {i < 3 && <div className="text-gray-600 text-2xl my-1">↓</div>}
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 3: LIVE MAP DASHBOARD ── */}
        <section id="dashboard" className="flex flex-col items-center px-8 py-24">
          <p className="text-sm uppercase tracking-widest text-orange-400 mb-4">Live Dashboard</p>
          <h2 className="text-4xl font-bold mb-2">Real-Time Safety Map</h2>
          <p className="text-gray-400 mb-10 text-center">
            Heat island zones · Cooling centres · Libraries · Your location — all in one map
          </p>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block"/><span>High Heat</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-400 inline-block"/><span>Medium Heat</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-yellow-400 inline-block"/><span>Low Heat</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"/><span>Safe</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"/><span>Cooling Centre</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-400 inline-block"/><span>Library</span></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500 inline-block"/><span>You</span></span>
          </div>

          {/* Temperature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-6">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">🌡️</span>
              <div>
                <p className="text-xs text-gray-500">Sensor Temperature</p>
                <p className="text-3xl font-bold text-orange-400">-- °C</p>
                <p className="text-xs text-gray-600 mt-0.5">Raspberry Pi · updates every 5s</p>
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 flex items-center gap-4">
              <span className="text-3xl">🌤️</span>
              <div>
                <p className="text-xs text-gray-500">Toronto Outdoor Temp</p>
                <p className="text-3xl font-bold text-yellow-400">-- °C</p>
                <p className="text-xs text-gray-600 mt-0.5">OpenWeather API · updates hourly</p>
              </div>
            </div>
          </div>

          {/* GPS + full map + nearest shelter */}
          <NearestShelter />
        </section>
      </main>

      <Footer />
    </>
  );
}
