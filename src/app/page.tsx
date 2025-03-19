'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { CorruptionCase, formatCurrency, formatSimplifiedAmount } from '@/types';
import corruptionData from '@/data/corruption-cases.json';

export default function Home() {
  const [sortConfig, setSortConfig] = useState<{ key: keyof CorruptionCase; direction: 'asc' | 'desc' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const cases = corruptionData.cases;
  const stats = {
    totalCases: cases.length,
    totalAmount: cases.reduce((sum, c) => sum + c.amount, 0)
  };

  const filteredCases = useMemo(() => {
    if (!searchQuery) return cases;
    const query = searchQuery.toLowerCase();
    return cases.filter(kasus =>
      kasus.caseName.toLowerCase().includes(query) ||
      kasus.year.toString().includes(query) ||
      formatCurrency(kasus.amount).toLowerCase().includes(query)
    );
  }, [cases, searchQuery]);

  const sortedCases = [...filteredCases].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof CorruptionCase) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  return (
    <main className="min-h-screen p-8 bg-neutral-50 font-sans">
      <h1 className="text-4xl font-bold text-center mb-8">Liga Korupsi Indonesia</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border border-[#E5E7EB] shadow-none">
          <CardHeader>
            <CardTitle>Total Kasus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalCases}</p>
          </CardContent>
        </Card>

        <Card className="border border-[#E5E7EB] shadow-none">
          <CardHeader>
            <CardTitle>Total Kerugian Negara</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{formatCurrency(stats.totalAmount)}</p>
            <p className="text-neutral-500">({formatSimplifiedAmount(stats.totalAmount)})</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Cari kasus korupsi..."
          className="pl-10 w-full md:w-96"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Cari kasus korupsi"
        />
      </div>

      <div className="rounded-lg border border-[#E5E7EB] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center w-20 cursor-pointer" onClick={() => handleSort('rank')}>
                <div className="flex items-center justify-center gap-1">
                  Urutan
                  {sortConfig?.key === 'rank' && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort('caseName')}>
                <div className="flex items-center gap-1">
                  Nama Kasus
                  {sortConfig?.key === 'caseName' && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer" onClick={() => handleSort('amount')}>
                <div className="flex items-center justify-end gap-1">
                  Jumlah
                  {sortConfig?.key === 'amount' && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="text-center w-24 cursor-pointer" onClick={() => handleSort('year')}>
                <div className="flex items-center justify-center gap-1">
                  Tahun
                  {sortConfig?.key === 'year' && (
                    <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="w-32">Referensi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCases.map((kasus) => (
              <TableRow key={kasus.id}>
                <TableCell className="text-center font-bold">{kasus.rank}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" className="p-0 hover:underline text-left">
                        {kasus.caseName}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{kasus.caseName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">{kasus.description}</p>
                        <div>
                          <h4 className="font-semibold mb-1">Tersangka:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {kasus.suspects.map((suspect, index) => (
                              <li key={index}>{suspect}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Institusi:</h4>
                          <p className="text-sm text-gray-600">{kasus.institution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Status:</h4>
                          <p className="text-sm text-gray-600">{kasus.status}</p>
                        </div>
                        {kasus.verdict !== "N/A" && (
                          <div>
                            <h4 className="font-semibold mb-1">Vonis:</h4>
                            <p className="text-sm text-gray-600">{kasus.verdict}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right">
                  <div>{formatCurrency(kasus.amount)}</div>
                  <div className="text-sm text-neutral-500">({formatSimplifiedAmount(kasus.amount)})</div>
                </TableCell>
                <TableCell className="text-center">{kasus.year}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        Lihat
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Referensi {kasus.caseName}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2">
                        {kasus.references.map((ref, index) => (
                          <a
                            key={index}
                            href={ref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-600 hover:underline"
                          >
                            {ref}
                          </a>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
