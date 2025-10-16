<#
stop-conflicting-mysql.ps1
Interactive helper to detect and stop the process listening on TCP port 3306 (MySQL/MariaDB), then optionally start XAMPP MySQL.

USAGE (Run as Administrator):
  1) Open PowerShell "Run as administrator".
  2) cd to the project folder, e.g.
       cd 'C:\Users\Andris Kaishungu\Documents\GitHub\G42-Polls-Memes-Platform'
  3) Run:
       Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
       .\scripts\stop-conflicting-mysql.ps1

This script only stops the detected process after explicit confirmation. It will:
 - show the PID and process details
 - show if a service is associated
 - try Stop-Service if service exists
 - otherwise try taskkill / Stop-Process
 - re-check whether port 3306 is free
 - optionally open XAMPP Control Panel

NOTE: If the process cannot be terminated due to protected account/permissions, rebooting the machine will clear it safely.
#>

function Write-Section($s){ Write-Host "`n=== $s ===`n" -ForegroundColor Cyan }

Write-Section "Check listener on port 3306"
$listeners = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if (-not $listeners) {
    Write-Host "No process is listening on port 3306. Nothing to stop." -ForegroundColor Green
    exit 0
}

$uniquePids = $listeners.OwningProcess | Sort-Object -Unique
foreach ($pid in $uniquePids) {
    Write-Host "Found PID: $pid" -ForegroundColor Yellow
    $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$pid" -ErrorAction SilentlyContinue | Select-Object ProcessId,Name,CommandLine,ExecutablePath,ParentProcessId
    if ($proc) {
        Write-Host "Process information:" -ForegroundColor White
        $proc | Format-List
    } else {
        Write-Host "No detailed process information available for PID $pid" -ForegroundColor Yellow
    }

    # check if a service is associated with this PID
    $svc = Get-CimInstance Win32_Service | Where-Object { $_.ProcessId -eq $pid }
    if ($svc) {
        Write-Host "Associated Windows service(s):" -ForegroundColor White
        $svc | Select-Object Name,DisplayName,State | Format-Table -AutoSize
    } else {
        Write-Host "No Windows service associated with PID $pid" -ForegroundColor Yellow
    }

    # ask for confirmation
    $confirm = Read-Host "Do you want to stop/kill PID $pid (Y/N)"
    if ($confirm -match '^[Yy]') {
        if ($svc) {
            foreach ($service in $svc) {
                Write-Host "Attempting to stop service $($service.Name) ..." -ForegroundColor Cyan
                try {
                    Stop-Service -Name $service.Name -Force -ErrorAction Stop
                    Write-Host "Service $($service.Name) stopped." -ForegroundColor Green
                } catch {
                    $errMsg = $_.Exception.Message
                    Write-Host "Stop-Service failed: $errMsg" -ForegroundColor Red
                }
            }
        } else {
            Write-Host "No service found; attempting to kill the process PID $pid..." -ForegroundColor Cyan
            try {
                # try taskkill first
                $tk = Start-Process -FilePath taskkill -ArgumentList "/PID $pid /F" -NoNewWindow -Wait -PassThru -ErrorAction Stop
                Write-Host "taskkill returned exit code $($tk.ExitCode)" -ForegroundColor Green
            } catch {
                $errMsg = $_.Exception.Message
                Write-Host "taskkill failed: $errMsg" -ForegroundColor Yellow
                try {
                    Stop-Process -Id $pid -Force -ErrorAction Stop
                    Write-Host "Stop-Process succeeded for PID $pid" -ForegroundColor Green
                } catch {
                    $errMsg = $_.Exception.Message
                    Write-Host "Unable to stop PID $pid - $errMsg" -ForegroundColor Red
                    Write-Host "You may need to reboot the machine or run this script from an elevated Administrator session." -ForegroundColor Yellow
                }
            }
        }
    } else {
        Write-Host "Skipping PID $pid" -ForegroundColor Yellow
    }
}

Write-Section "Re-check port 3306"
Start-Sleep -Seconds 1
$still = Get-NetTCPConnection -LocalPort 3306 -ErrorAction SilentlyContinue
if ($still) {
    Write-Host "Port 3306 is still in use. The process may be protected or require a reboot to clear." -ForegroundColor Red
    $res = Read-Host "Do you want to reboot now? (reboot will clear the process) (Y/N)"
    if ($res -match '^[Yy]') {
        Write-Host "Rebooting in 5 seconds... Press Ctrl+C to cancel." -ForegroundColor Yellow
        Start-Sleep -Seconds 5
        Restart-Computer
    } else {
        Write-Host "Please reboot later or try stopping the process/service as Administrator." -ForegroundColor Yellow
    }
    exit 1
} else {
    Write-Host "Port 3306 is now free." -ForegroundColor Green
}

# Optionally start XAMPP Control Panel or MySQL service
Write-Host "`nDo you want to open the XAMPP Control Panel so you can start MySQL? (Y/N)" -ForegroundColor Cyan
$openXampp = Read-Host
if ($openXampp -match '^[Yy]') {
    $xamppPath = 'C:\xampp\xampp-control.exe'
    if (Test-Path $xamppPath) {
        Start-Process -FilePath $xamppPath
        Write-Host "Opened XAMPP Control Panel. Start MySQL from the GUI." -ForegroundColor Green
    } else {
        Write-Host "XAMPP Control Panel not found at $xamppPath. If you installed XAMPP to a different location, open it manually." -ForegroundColor Yellow
    }
}

Write-Host "Done." -ForegroundColor Cyan
exit 0
