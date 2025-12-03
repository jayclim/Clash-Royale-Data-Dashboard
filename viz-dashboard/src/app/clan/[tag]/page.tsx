'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Users, Trophy, MapPin, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import ClanScatterPlot from '@/components/clan/ClanScatterPlot';
import TrophyHistogram from '@/components/clan/TrophyHistogram';

export default function ClanDashboard() {
  const params = useParams();
  const tag = params.tag as string;
  
  const [clanData, setClanData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!tag) return;

    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const cleanTag = tag.replace('#', '').toUpperCase();
        const res = await fetch(`/api/clan/${cleanTag}`);
        
        if (!res.ok) {
          if (res.status === 404) throw new Error('Clan not found');
          throw new Error('Failed to fetch clan data');
        }

        const data = await res.json();
        setClanData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tag]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <div className="text-red-400 bg-red-900/20 border border-red-900/50 p-4 rounded-lg">
          {error}
        </div>
        <Link href="/clan" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
      </div>
    );
  }

  if (!clanData) return null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Link */}
        <Link href="/clan" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>

        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Clan Header Card */}
          <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                  {clanData.name}
                  <span className="text-sm font-normal text-gray-500 bg-[#262626] px-2 py-1 rounded">{clanData.tag}</span>
                </h1>
                <p className="text-gray-400 max-w-2xl">{clanData.description}</p>
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" /> {clanData.location?.name}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Users className="w-4 h-4" /> {clanData.members}/50 Members
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Shield className="w-4 h-4" /> {clanData.type === 'inviteOnly' ? 'Invite Only' : clanData.type}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                 <div className="flex items-center gap-2 text-yellow-500">
                    <Trophy className="w-8 h-8" />
                    <span className="text-4xl font-bold">{clanData.clanScore?.toLocaleString()}</span>
                 </div>
                 <div className="text-sm text-gray-500 uppercase font-bold">Clan Score</div>
                 
                 <div className="flex items-center gap-2 text-purple-400 mt-2">
                    <span className="text-2xl font-bold">{clanData.clanWarTrophies?.toLocaleString()}</span>
                 </div>
                 <div className="text-xs text-gray-500 uppercase font-bold">War Trophies</div>
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ClanScatterPlot members={clanData.memberList} />
            <TrophyHistogram members={clanData.memberList} />
          </div>

          {/* Member List */}
          <div className="bg-[#171717] border border-[#262626] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#262626]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5" /> Member List
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-[#262626] text-gray-200 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-3">Rank</th>
                    <th className="px-6 py-3">Player</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3 text-right">Trophies</th>
                    <th className="px-6 py-3 text-right">Donations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262626]">
                  {clanData.memberList?.map((member: any) => (
                    <tr key={member.tag} className="hover:bg-[#262626]/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">#{member.clanRank}</td>
                      <td className="px-6 py-4">
                        <Link href={`/player/${member.tag.replace('#', '')}`} className="text-blue-400 hover:text-blue-300 font-medium">
                          {member.name}
                        </Link>
                        <div className="text-xs text-gray-600">{member.tag}</div>
                      </td>
                      <td className="px-6 py-4 capitalize">{member.role.replace('coLeader', 'Co-Leader')}</td>
                      <td className="px-6 py-4 text-right text-yellow-500 font-bold">{member.trophies.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-green-500">{member.donations.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
