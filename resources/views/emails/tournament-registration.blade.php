<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nueva Inscripción - {{ $post->title }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #1CA9C9;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
        }
        .field {
            margin-bottom: 15px;
            padding: 10px;
            background-color: white;
            border-left: 3px solid #1CA9C9;
        }
        .field-label {
            font-weight: bold;
            color: #1CA9C9;
            margin-bottom: 5px;
        }
        .field-value {
            color: #333;
        }
        .footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">Nueva Inscripción al Torneo</h1>
        <p style="margin: 5px 0 0 0;">{{ $post->title }}</p>
    </div>
    
    <div class="content">
        <p>Has recibido una nueva inscripción para el torneo. A continuación se muestran los datos del participante:</p>
        
        @foreach($post->form_fields as $field)
            <div class="field">
                <div class="field-label">{{ $field['label'] }}</div>
                <div class="field-value">
                    @if(isset($registrationData[$field['name']]))
                        {{ $registrationData[$field['name']] }}
                    @else
                        <em>No proporcionado</em>
                    @endif
                </div>
            </div>
        @endforeach
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e8f4f8; border-radius: 5px;">
            <strong>Fecha de inscripción:</strong> {{ now()->format('d/m/Y H:i') }}
        </div>
    </div>
    
    <div class="footer">
        <p>Este correo fue enviado automáticamente desde Las Canteras Beach Volley</p>
    </div>
</body>
</html>
