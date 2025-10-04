import React, { useState, useEffect } from 'react';
import { Users, FileText } from 'lucide-react';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast'; // 1. react-hot-toast ko import kiya

// StatCard component (no change needed here)
const StatCard = ({ title, value, icon: Icon }) => (
    <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</CardTitle>
            <Icon className="h-5 w-5 text-gray-400" />
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold dark:text-white">{value}</div>
        </CardContent>
    </Card>
);

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalPosts: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // We can still keep this for major errors

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, statsRes] = await Promise.all([
                fetch('/api/v1/admin/users', { credentials: 'include' }),
                fetch('/api/v1/admin/stats', { credentials: 'include' })
            ]);
            const usersData = await usersRes.json();
            const statsData = await statsRes.json();
            if (usersData.success) setUsers(usersData.users);
            if (statsData.success) setStats(statsData.stats);
        } catch (err) {
            setError(err.message);
            toast.error("Failed to fetch dashboard data."); // Error toast
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user and all their posts?")) return;
        try {
            const res = await fetch(`/api/v1/admin/users/${userId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setUsers(users.filter(user => user._id !== userId));
                setStats(prevStats => ({ ...prevStats, totalUsers: prevStats.totalUsers - 1 }));
                toast.success("User deleted successfully!"); // 2. alert() ki jagah toast.success()
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            toast.error(err.message); // 3. Error aane par toast.error() dikhana
            setError(err.message);
        }
    };

    if (loading) return <div className="text-center py-20">Loading Dashboard...</div>;
    // Main error display agar poora page hi fail ho jaaye
    if (error && users.length === 0) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 space-y-8">
            <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={stats.totalUsers} icon={Users} />
                <StatCard title="Total Posts" value={stats.totalPosts} icon={FileText} />
            </div>

            {/* Users Table */}
            <div>
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Manage Users</h2>
                <Card className="shadow-lg">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">Name</TableHead>
                                    <TableHead className="font-semibold">Email</TableHead>
                                    <TableHead className="font-semibold">Role</TableHead>
                                    <TableHead className="text-right font-semibold">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                                        <TableCell className="text-gray-500 dark:text-gray-400">{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDeleteUser(user._id)}
                                                disabled={user.role === 'admin'}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;