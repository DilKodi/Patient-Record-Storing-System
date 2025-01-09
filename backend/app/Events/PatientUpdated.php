<?php

namespace App\Events;

use App\Models\Patient;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Log;

class PatientUpdated implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $patient;

    public function __construct(Patient $patient)
    {
        $this->patient = $patient;

        Log::info('PatientUpdated event instantiated', ['patient_id' => $patient->id]);
    }

    public function broadcastOn()
    {

        Log::info('Broadcasting to channel: doctors');

        // Broadcast to a general "doctors" channel
        return new Channel('doctors');
    }

    public function broadcastAs()
    {
        return 'patient.updated';
    }
}
