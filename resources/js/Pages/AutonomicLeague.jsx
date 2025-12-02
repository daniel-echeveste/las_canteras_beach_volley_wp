import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import ScheduleTable from "@/Components/ScheduleTable";

export default function AutonomicLeague() {
    const [isFemale, setIsFemale] = useState(false);
    const [viewMode, setViewMode] = useState('schedule'); // 'schedule' or 'classification'

    const scheduleMale = [
        // Jornada 1
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "ELITEFIT CANARIAS", visitante: "BRAVEHEART GC", cancha: "Canteras", resultado: "0-3" },
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "NET 7 BLACKBOARD", visitante: "CANACANTE", cancha: "Alcaravaneras", resultado: "1-2" },
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "DESCANSA", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "ICOREN", visitante: "OVERBLOCK MASPALOMAS", cancha: "tenerife", resultado: "3-0" },
        // Jornada 2
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "BRAVEHEART GC", visitante: "OVERBLOCK MASPALOMAS", cancha: "", resultado: "" },
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "VOLEY MAXORATA", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 2, fecha: "14/12/2025", hora: "10:00", local: "CANACANTE", visitante: "DESCANSA", cancha: "Canteras", resultado: "" },
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "ELITEFIT CANARIAS", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 3
        { jornada: 3, fecha: "27/12/2025", hora: "", local: "NET 7 BLACKBOARD", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 3, fecha: "27/12/2025", hora: "", local: "DESCANSA", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        { jornada: 3, fecha: "27/12/2025", hora: "", local: "ICOREN", visitante: "CANACANTE", cancha: "", resultado: "" },
        { jornada: 3, fecha: "27/12/2025", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        // Jornada 4
        { jornada: 4, fecha: "03/01/2026", hora: "", local: "BRAVEHEART GC", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 4, fecha: "04/01/2026", hora: "10:00", local: "CANACANTE", visitante: "OVERBLOCK MASPALOMAS", cancha: "Canteras", resultado: "" },
        { jornada: 4, fecha: "03/01/2026", hora: "", local: "ELITEFIT CANARIAS", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 4, fecha: "03/01/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "DESCANSA", cancha: "", resultado: "" },
        // Jornada 5
        { jornada: 5, fecha: "10/01/2026", hora: "", local: "DESCANSA", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 5, fecha: "10/01/2026", hora: "", local: "ICOREN", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        { jornada: 5, fecha: "10/01/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        { jornada: 5, fecha: "10/01/2026", hora: "", local: "VOLEY MAXORATA", visitante: "CANACANTE", cancha: "", resultado: "" },
        // Jornada 6
        { jornada: 6, fecha: "17/01/2026", hora: "", local: "BRAVEHEART GC", visitante: "CANACANTE", cancha: "", resultado: "" },
        { jornada: 6, fecha: "17/01/2026", hora: "", local: "ELITEFIT CANARIAS", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 6, fecha: "17/01/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "OVERBLOCK MASPALOMAS", cancha: "", resultado: "" },
        { jornada: 6, fecha: "17/01/2026", hora: "", local: "DESCANSA", visitante: "ICOREN", cancha: "", resultado: "" },
        // Jornada 7
        { jornada: 7, fecha: "24/01/2026", hora: "", local: "ICOREN", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 7, fecha: "24/01/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "DESCANSA", cancha: "", resultado: "" },
        { jornada: 7, fecha: "24/01/2026", hora: "", local: "VOLEY MAXORATA", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        { jornada: 7, fecha: "25/01/2026", hora: "10:00", local: "CANACANTE", visitante: "ELITEFIT CANARIAS", cancha: "Canteras", resultado: "" },
        // Jornada 8
        { jornada: 8, fecha: "07/02/2026", hora: "", local: "BRAVEHEART GC", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        { jornada: 8, fecha: "08/02/2026", hora: "10:00", local: "CANACANTE", visitante: "NET 7 BLACKBOARD", cancha: "Canteras", resultado: "" },
        { jornada: 8, fecha: "07/02/2026", hora: "", local: "VOLEY MAXORATA", visitante: "DESCANSA", cancha: "", resultado: "" },
        { jornada: 8, fecha: "07/02/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "ICOREN", cancha: "", resultado: "" },
        // Jornada 9
        { jornada: 9, fecha: "14/02/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 9, fecha: "14/02/2026", hora: "", local: "ICOREN", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 9, fecha: "14/02/2026", hora: "", local: "DESCANSA", visitante: "CANACANTE", cancha: "", resultado: "" },
        { jornada: 9, fecha: "14/02/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        // Jornada 10
        { jornada: 10, fecha: "28/02/2026", hora: "", local: "BRAVEHEART GC", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        { jornada: 10, fecha: "28/02/2026", hora: "", local: "ELITEFIT CANARIAS", visitante: "DESCANSA", cancha: "", resultado: "" },
        { jornada: 10, fecha: "01/03/2026", hora: "10:00", local: "CANACANTE", visitante: "ICOREN", cancha: "Canteras", resultado: "" },
        { jornada: 10, fecha: "28/02/2026", hora: "", local: "VOLEY MAXORATA", visitante: "OVERBLOCK MASPALOMAS", cancha: "", resultado: "" },
        // Jornada 11
        { jornada: 11, fecha: "07/03/2026", hora: "", local: "VOLEY MAXORATA", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 11, fecha: "07/03/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "CANACANTE", cancha: "", resultado: "" },
        { jornada: 11, fecha: "07/03/2026", hora: "", local: "ICOREN", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        { jornada: 11, fecha: "07/03/2026", hora: "", local: "DESCANSA", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 12
        { jornada: 12, fecha: "21/03/2026", hora: "", local: "BRAVEHEART GC", visitante: "DESCANSA", cancha: "", resultado: "" },
        { jornada: 12, fecha: "21/03/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 12, fecha: "21/03/2026", hora: "", local: "ELITEFIT CANARIAS", visitante: "OVERBLOCK MASPALOMAS", cancha: "", resultado: "" },
        { jornada: 12, fecha: "22/03/2026", hora: "10:00", local: "CANACANTE", visitante: "VOLEY MAXORATA", cancha: "Canteras", resultado: "" },
        // Jornada 13
        { jornada: 13, fecha: "29/03/2026", hora: "10:00", local: "CANACANTE", visitante: "BRAVEHEART GC", cancha: "Canteras", resultado: "" },
        { jornada: 13, fecha: "28/03/2026", hora: "", local: "VOLEY MAXORATA", visitante: "ELITEFIT CANARIAS", cancha: "", resultado: "" },
        { jornada: 13, fecha: "28/03/2026", hora: "", local: "OVERBLOCK MASPALOMAS", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        { jornada: 13, fecha: "28/03/2026", hora: "", local: "ICOREN", visitante: "DESCANSA", cancha: "", resultado: "" },
        // Jornada 14
        { jornada: 14, fecha: "11/04/2026", hora: "", local: "BRAVEHEART GC", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 14, fecha: "11/04/2026", hora: "", local: "DESCANSA", visitante: "OVERBLOCK MASPALOMAS", cancha: "", resultado: "" },
        { jornada: 14, fecha: "11/04/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 14, fecha: "11/04/2026", hora: "", local: "ELITEFIT CANARIAS", visitante: "CANACANTE", cancha: "", resultado: "" },
    ];

    const scheduleFemale = [
        // Jornada 1
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "DESCANSA", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "CD SIDEOUT", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 1, fecha: "29/11/2025", hora: "", local: "BRAVEHEART GC", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "3-0" },
        // Jornada 2
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "DESCANSA", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "VOLEY MAXORATA", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 2, fecha: "13/12/2025", hora: "", local: "NET 7 BLACKBOARD", visitante: "CD SIDEOUT", cancha: "Alcaravaneras", resultado: "" },
        // Jornada 3
        { jornada: 3, fecha: "10/01/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
        { jornada: 3, fecha: "10/01/2026", hora: "", local: "BRAVEHEART GC", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 3, fecha: "10/01/2026", hora: "", local: "CD SIDEOUT", visitante: "DESCANSA", cancha: "", resultado: "" },
        // Jornada 4
        { jornada: 4, fecha: "24/01/2026", hora: "", local: "BRAVEHEART GC", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
        { jornada: 4, fecha: "24/01/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 4, fecha: "24/01/2026", hora: "", local: "DESCANSA", visitante: "ICOREN", cancha: "", resultado: "" },
        // Jornada 5
        { jornada: 5, fecha: "14/02/2026", hora: "", local: "VOLEY MAXORATA", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
        { jornada: 5, fecha: "14/02/2026", hora: "", local: "ICOREN", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 5, fecha: "14/02/2026", hora: "", local: "DESCANSA", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 6
        { jornada: 6, fecha: "28/02/2026", hora: "", local: "VOLEY MAXORATA", visitante: "DESCANSA", cancha: "", resultado: "" },
        { jornada: 6, fecha: "28/02/2026", hora: "", local: "ICOREN", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
        { jornada: 6, fecha: "28/02/2026", hora: "", local: "BRAVEHEART GC", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 7 (2ª Vuelta starts)
        { jornada: 7, fecha: "07/03/2026", hora: "", local: "DESCANSA", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 7, fecha: "07/03/2026", hora: "", local: "ICOREN", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 7, fecha: "07/03/2026", hora: "", local: "CD SIDEOUT", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 8
        { jornada: 8, fecha: "21/03/2026", hora: "", local: "DESCANSA", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
        { jornada: 8, fecha: "21/03/2026", hora: "", local: "BRAVEHEART GC", visitante: "VOLEY MAXORATA", cancha: "", resultado: "" },
        { jornada: 8, fecha: "21/03/2026", hora: "", local: "NET 7 BLACKBOARD", visitante: "ICOREN", cancha: "", resultado: "" },
        // Jornada 9
        { jornada: 9, fecha: "28/03/2026", hora: "", local: "DESCANSA", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 9, fecha: "28/03/2026", hora: "", local: "CD SIDEOUT", visitante: "BRAVEHEART GC", cancha: "", resultado: "" },
        { jornada: 9, fecha: "28/03/2026", hora: "", local: "VOLEY MAXORATA", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        // Jornada 10
        { jornada: 10, fecha: "11/04/2026", hora: "", local: "DESCANSA", visitante: "NET 7 BLACKBOARD", cancha: "", resultado: "" },
        { jornada: 10, fecha: "11/04/2026", hora: "", local: "BRAVEHEART GC", visitante: "ICOREN", cancha: "", resultado: "" },
        { jornada: 10, fecha: "11/04/2026", hora: "", local: "VOLEY MAXORATA", visitante: "CD SIDEOUT", cancha: "", resultado: "" },
    ];

    const currentSchedule = isFemale ? scheduleFemale : scheduleMale;
    const leagueTitle = isFemale
        ? "LIGA SEGUNDA DIVISIÓN NACIONAL VOLEY PLAYA FEMENINO 2025/2026"
        : "LIGA SEGUNDA DIVISIÓN NACIONAL VOLEY PLAYA MASCULINO 2025/2026";

    const calculateRanking = (schedule) => {
        const teams = {};

        // Initialize teams from schedule
        schedule.forEach((match) => {
            if (match.local !== "DESCANSA" && !teams[match.local]) {
                teams[match.local] = { name: match.local, played: 0, won: 0, lost: 0, setsWon: 0, setsLost: 0, points: 0 };
            }
            if (match.visitante !== "DESCANSA" && !teams[match.visitante]) {
                teams[match.visitante] = { name: match.visitante, played: 0, won: 0, lost: 0, setsWon: 0, setsLost: 0, points: 0 };
            }
        });

        schedule.forEach((match) => {
            if (match.resultado && match.local !== "DESCANSA" && match.visitante !== "DESCANSA") {
                const [localSets, visitorSets] = match.resultado.split("-").map(Number);

                if (!isNaN(localSets) && !isNaN(visitorSets)) {
                    // Update Local Team
                    teams[match.local].played += 1;
                    teams[match.local].setsWon += localSets;
                    teams[match.local].setsLost += visitorSets;
                    teams[match.local].points += localSets; // Points = Sets Won

                    // Update Visitor Team
                    teams[match.visitante].played += 1;
                    teams[match.visitante].setsWon += visitorSets;
                    teams[match.visitante].setsLost += localSets;
                    teams[match.visitante].points += visitorSets; // Points = Sets Won
                }
            }
        });

        return Object.values(teams).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.setsWon !== a.setsWon) return b.setsWon - a.setsWon;
            return a.setsLost - b.setsLost;
        });
    };

    const ranking = calculateRanking(currentSchedule);

    return (
        <>
            <Head title="Liga Autonómica - Las Canteras Vóley" />
            <div className="min-h-screen bg-[#FFF8E8] text-gray-900 font-sans">
                <Navbar />
                <div className="pt-24 max-w-6xl mx-auto px-6 pb-12">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
                        <h1 className="text-4xl font-extrabold text-[#1CA9C9]">Liga Autonómica</h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsFemale(!isFemale)}
                                className="px-4 py-2 bg-[#1CA9C9] text-white rounded-lg font-semibold hover:bg-[#158BA8] transition-colors duration-200 shadow-md"
                            >
                                {isFemale ? "Ver Masculino" : "Ver Femenino"}
                            </button>
                            <button
                                onClick={() => setViewMode(viewMode === 'schedule' ? 'classification' : 'schedule')}
                                className="px-4 py-2 bg-[#F2A900] text-white rounded-lg font-semibold hover:bg-[#D49000] transition-colors duration-200 shadow-md"
                            >
                                {viewMode === 'schedule' ? "Ver Clasificación" : "Ver Calendario"}
                            </button>
                        </div>
                    </div>
                    <p className="text-lg text-gray-700 mb-8">
                        {leagueTitle}
                    </p>

                    {viewMode === 'schedule' ? (
                        <ScheduleTable schedule={currentSchedule} />
                    ) : (
                        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1CA9C9] text-white">
                                        <th className="p-4 font-bold text-center">Pos</th>
                                        <th className="p-4 font-bold">Equipo</th>
                                        <th className="p-4 font-bold text-center">PJ</th>
                                        <th className="p-4 font-bold text-center">SG</th>
                                        <th className="p-4 font-bold text-center">SP</th>
                                        <th className="p-4 font-bold text-center">Pts</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ranking.map((team, index) => (
                                        <tr key={team.name} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF8E8]/30'}`}>
                                            <td className="p-4 text-center font-semibold text-gray-600">{index + 1}</td>
                                            <td className="p-4 font-medium text-gray-800">{team.name}</td>
                                            <td className="p-4 text-center text-gray-600">{team.played}</td>
                                            <td className="p-4 text-center text-green-600 font-semibold">{team.setsWon}</td>
                                            <td className="p-4 text-center text-red-500">{team.setsLost}</td>
                                            <td className="p-4 text-center font-bold text-[#1CA9C9] text-lg">{team.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
