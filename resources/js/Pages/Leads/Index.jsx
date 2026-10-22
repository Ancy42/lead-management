import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Index({ auth, leads, filters, statuses }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [sort, setSort] = useState(filters.sort || 'desc');

    const handleFilterChange = (newSearch, newStatus, newSort) => {
        router.get(
            route('leads.index'),
            { search: newSearch, status: newStatus, sort: newSort },
            { preserveState: true, replace: true }
        );
    };

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        handleFilterChange(val, status, sort);
    };

    const handleStatusFilter = (e) => {
        const val = e.target.value;
        setStatus(val);
        handleFilterChange(search, val, sort);
    };

    const handleSortToggle = () => {
        const newSort = sort === 'asc' ? 'desc' : 'asc';
        setSort(newSort);
        handleFilterChange(search, status, newSort);
    };

    const handleInlineStatusChange = (leadId, newStatus) => {
        router.patch(route('leads.updateStatus', leadId), { status: newStatus }, {
            preserveScroll: true
        });
    };

    const handleDelete = (leadId) => {
        if (confirm('Are you sure you want to delete this lead?')) {
            router.delete(route('leads.destroy', leadId));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Lead Management</h2>
                    <Link
                        href={route('leads.create')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-sm transition"
                    >
                        + Create Lead
                    </Link>
                </div>
            }
        >
            <Head title="Leads" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-4">
                    {/* Filters Section */}
                    <div className="bg-white p-4 shadow sm:rounded-lg flex flex-wrap items-center gap-4 justify-between">
                        <div className="flex flex-wrap items-center gap-3">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={handleSearch}
                                className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500 w-64"
                            />

                            <select
                                value={status}
                                onChange={handleStatusFilter}
                                className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All Statuses</option>
                                {statuses.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleSortToggle}
                            className="text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 px-3 py-2 rounded flex items-center gap-1 font-medium text-gray-700"
                        >
                            Sort Date: {sort === 'asc' ? 'Oldest First (Asc)' : 'Newest First (Desc)'}
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Phone</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">Created Date</th>
                                    <th className="px-6 py-3 text-right font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {leads.data.length > 0 ? (
                                    leads.data.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-medium text-gray-900">{lead.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                                            <td className="px-6 py-4 text-gray-600">{lead.phone}</td>
                                            <td className="px-6 py-4">
                                                {/* Inline Status Dropdown (Bonus) */}
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleInlineStatusChange(lead.id, e.target.value)}
                                                    className="text-xs font-semibold rounded-full border-gray-300 py-1 px-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                >
                                                    {statuses.map((st) => (
                                                        <option key={st} value={st}>{st}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <Link
                                                    href={route('leads.edit', lead.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(lead.id)}
                                                    className="text-red-600 hover:text-red-900 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-6 text-gray-500">
                                            No leads found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Pagination Links */}
                        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                                Showing {leads.from || 0} to {leads.to || 0} of {leads.total} entries
                            </span>
                            <div className="flex gap-1">
                                {leads.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1 border rounded text-sm ${
                                            link.active
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : link.url
                                                ? 'bg-white text-gray-700 hover:bg-gray-50'
                                                : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}