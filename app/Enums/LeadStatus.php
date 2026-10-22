<?php

namespace App\Enums;

enum LeadStatus: string
{
    case NEW = 'New';
    case CONTACTED = 'Contacted';
    case CONVERTED = 'Converted';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
