import React from "react";

export default function ScheduleTable({ schedule }) {
    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">Jornada</th>
                        <th scope="col" className="px-6 py-3">Fecha</th>
                        <th scope="col" className="px-6 py-3">Hora</th>
                        <th scope="col" className="px-6 py-3">Partido</th>
                        <th scope="col" className="px-6 py-3">Cancha</th>
                        <th scope="col" className="px-6 py-3">Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((match, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {match.jornada}
                            </td>
                            <td className="px-6 py-4">
                                {match.fecha}
                            </td>
                            <td className="px-6 py-4">
                                {match.hora || "-"}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className={`font-semibold ${match.local === 'DESCANSA' ? 'text-red-500' : ''}`}>{match.local}</span>
                                    <span className="hidden sm:inline text-gray-400">vs</span>
                                    <span className={`font-semibold ${match.visitante === 'DESCANSA' ? 'text-red-500' : ''}`}>{match.visitante}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {match.cancha || "-"}
                            </td>
                            <td className="px-6 py-4">
                                {match.resultado || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
