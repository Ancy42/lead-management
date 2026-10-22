<?php

namespace App\Http\Controllers;

use App\Enums\LeadStatus;
use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $sortDirection = $request->input('sort', 'desc');

        $leads = Lead::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', in_array(strtolower($sortDirection), ['asc', 'desc']) ? $sortDirection : 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Leads/Index', [
            'leads' => $leads,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
                'sort' => $sortDirection,
            ],
            'statuses' => LeadStatus::values(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Leads/Create', [
            'statuses' => LeadStatus::values(),
        ]);
    }

    public function store(StoreLeadRequest $request): RedirectResponse
    {
        Lead::create($request->validated());

        return redirect()->route('leads.index')->with('success', 'Lead created successfully.');
    }

    public function edit(Lead $lead): Response
    {
        return Inertia::render('Leads/Edit', [
            'lead' => $lead,
            'statuses' => LeadStatus::values(),
        ]);
    }

    public function update(UpdateLeadRequest $request, Lead $lead): RedirectResponse
    {
        $lead->update($request->validated());

        return redirect()->route('leads.index')->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        // $this->authorize('delete', $lead);
        Gate::authorize('delete', $lead);
        $lead->delete();

        return redirect()->route('leads.index')->with('success', 'Lead deleted successfully.');
    }

    public function updateStatus(Request $request, Lead $lead): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', new Enum(LeadStatus::class)],
        ]);

        $lead->update($validated);

        return back()->with('success', 'Status updated successfully.');
    }
}
