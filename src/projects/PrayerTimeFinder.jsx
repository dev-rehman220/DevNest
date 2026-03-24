import { useEffect, useState } from "react";

export default function PrayerTimeFinder() {
  const [city, setCity] = useState(""); 
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userLocation, setUserLocation] = useState(null); 
  const [locationLabel, setLocationLabel] = useState("");
  const [lastRequest, setLastRequest] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchPrayerTimesByCoordinates(latitude, longitude);
      },
      (geoError) => {
        console.log("Location access denied:", geoError);
        setError("Enable location access for automatic detection.");
      }
    );
  }, []);

  const extractLocationFromTimezone = (timezone = "") => {
    const parts = timezone.split("/"); 
    const rawLabel = parts[parts.length - 1] || "Your Location"; 
    return rawLabel.replaceAll("_", " ");
  };

  const parseJsonResponse = async (response) => {
    const contentType = response.headers.get("content-type") || "";
    const rawBody = await response.text();

    if (!contentType.toLowerCase().includes("application/json")) {
      throw new Error("Server returned an unexpected response. Please try again.");
    }

    try {
      return JSON.parse(rawBody);
    } catch {
      throw new Error("Server returned unreadable data. Please try again.");
    }
  };

  const resolveLocationLabel = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );

      if (!response.ok) {
        return "";
      }

      const payload = await parseJsonResponse(response);

      const cityName = payload.city || payload.locality || payload.localityInfo?.administrative?.[2]?.name || "";
      const regionName = payload.principalSubdivision || payload.countryName || "";

      if (cityName && regionName && cityName !== regionName) {
        return `${cityName}, ${regionName}`;
      }

      return cityName || regionName || "";
    } catch (locationError) {
      console.log("Reverse geocoding failed:", locationError);
      return "";
    }
  };

  const fetchPrayerTimes = async (cityName) => {
    const trimmedCity = cityName.trim();

    if (!trimmedCity) {
      setError("Please enter a city name."); 
      return;
    }

    setLastRequest({ type: "city", cityName: trimmedCity });

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(trimmedCity)}&country=&method=2`
      );
      const payload = await parseJsonResponse(response);

      if (!response.ok || payload.code !== 200) {
        throw new Error("City not found. Please try another city.");
      }

      setPrayerTimes(payload.data);
      setLocationLabel(trimmedCity);
      setCity("");
    } catch (requestError) {
      setError(requestError.message || "Failed to fetch prayer times.");
      setPrayerTimes(null);
      setLocationLabel("");
    } finally {
      setLoading(false);
    }
  };

  const fetchPrayerTimesByCoordinates = async (lat, lon) => {
    setLastRequest({ type: "coords", lat, lon });
    setLoading(true); 
    setError("");

    try {
      const today = new Date();
      const day = today.getDate(); 
      const month = today.getMonth() + 1; 
      const year = today.getFullYear();

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lon}&method=2`
      ); 

      const payload = await parseJsonResponse(response); 

      if (!response.ok || payload.code !== 200) {
        throw new Error("Failed to fetch prayer times for your location.");
      }

      setPrayerTimes(payload.data);
      const resolvedLabel = await resolveLocationLabel(lat, lon);
      const timezone = payload.data?.meta?.timezone || "";
      setLocationLabel(resolvedLabel || extractLocationFromTimezone(timezone));
    } catch (requestError) {
      console.log("Error fetching by coordinates:", requestError);
      setError("Unable to auto-fetch location timings. Try searching by city.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetPrayerTimes = () => {
    fetchPrayerTimes(city);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleGetPrayerTimes();
    }
  };

  const handleRetry = () => {
    if (!lastRequest || loading) {
      return;
    }

    if (lastRequest.type === "city") {
      fetchPrayerTimes(lastRequest.cityName);
      return;
    }

    if (lastRequest.type === "coords") {
      fetchPrayerTimesByCoordinates(lastRequest.lat, lastRequest.lon);
    }
  };

  const formatToLocal12Hour = (timeValue = "") => {
    const rawTime = timeValue.split(" ")[0] || "";
    const [hoursPart, minutesPart] = rawTime.split(":");

    const hours = Number(hoursPart);
    const minutes = Number(minutesPart);

    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
      return "--:--";
    }

    const localDate = new Date();
    localDate.setHours(hours, minutes, 0, 0);

    return localDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="space-y-6">
      <div className="surface-card rounded-2xl p-6 text-center">
        <h2 className="display-font mb-2 text-3xl font-bold text-gray-900">Prayer Time Finder</h2>
        <p className="text-gray-600">Get prayer times for your location or search by city.</p>
      </div>

      <div className="surface-card rounded-2xl p-6">
        <label className="mb-2 block text-sm font-semibold text-gray-700">Search by City</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name (e.g., London, New York)"
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
          />
          <button
            onClick={handleGetPrayerTimes}
            disabled={loading}
            className="rounded-lg bg-teal-700 px-6 py-2 font-semibold text-white transition hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>

        {userLocation && (
          <p className="mt-2 text-xs text-gray-500">Auto-detected location enabled.</p>
        )}
      </div>

      {error && (
        <div className="surface-card rounded-2xl border-l-4 border-red-500 bg-red-50 p-4">
          <p className="text-sm font-medium text-red-700">{error}</p>
          {lastRequest && (
            <button
              onClick={handleRetry}
              disabled={loading}
              className="mt-3 rounded-md bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Retrying..." : "Retry"}
            </button>
          )}
        </div>
      )}

      {prayerTimes && (
        <div className="surface-card rounded-2xl p-6">
          <h3 className="mb-4 text-xl font-bold text-gray-900">
            Today's Prayer Times for {locationLabel || "Your Location"}
          </h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-4">
              <p className="text-sm font-semibold text-teal-700">Fajr</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Fajr)}</p>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
              <p className="text-sm font-semibold text-orange-700">Sunrise</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Sunrise)}</p>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm font-semibold text-yellow-700">Dhuhr</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Dhuhr)}</p>
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-700">Asr</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Asr)}</p>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
              <p className="text-sm font-semibold text-purple-700">Maghrib</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Maghrib)}</p>
            </div>

            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <p className="text-sm font-semibold text-indigo-700">Isha</p>
              <p className="text-2xl font-bold text-gray-900">{formatToLocal12Hour(prayerTimes.timings.Isha)}</p>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">Date: {prayerTimes.date.gregorian.date}</p>
        </div>
      )}

      {!prayerTimes && !loading && !error && (
        <div className="surface-card rounded-2xl p-8 text-center">
          <p className="text-gray-600">
            {userLocation
              ? "Fetching prayer times for your location..."
              : "Enter a city name or enable location access to see prayer times."}
          </p>
        </div>
      )}
    </section>
  );
}
