// ==========================================================================
// PIPELINE RUNTIME ENGINE — Real-Time Database Profile Verification Loop
// ==========================================================================

const databaseLayers = [
    { id: 'l1', elementId: 'node-l1', statusId: 'status-l1', matchPoints: 20, msgPass: 'Match: Keystroke Rhythm Validated', msgFail: 'Mismatch: Suspicious Input Cadence' },
    { id: 'l2', elementId: 'node-l2', statusId: 'status-l2', matchPoints: 20, msgPass: 'Match: Phone Grip & Tilt Verified', msgFail: 'Mismatch: Emulated Sensor Profile' },
    { id: 'l3', elementId: 'node-l3', statusId: 'status-l3', matchPoints: 20, msgPass: 'Match: Within Normal Spending Limit', msgFail: 'Mismatch: Extreme Outlier Value Spike' },
    { id: 'l4', elementId: 'node-l4', statusId: 'status-l4', matchPoints: 20, msgPass: 'Match: Standard Network Node', msgFail: 'Mismatch: Unverified VPN Proxy Relay' },
    { id: 'l5', elementId: 'node-l5', statusId: 'status-l5', matchPoints: 20, msgPass: 'Match: Device Timeline Verified', msgFail: 'Mismatch: Anomalous 3 AM Midnight Login' }
];

let pipelineRunning = false;

// Coordinates baseline comparisons to calculate structural match percentages
function verifyPipeline(executionMode) {
    if (pipelineRunning) return;
    pipelineRunning = true;

    // Reset layout view models cleanly before starting execution loops
    databaseLayers.forEach(node => {
        const el = document.getElementById(node.elementId);
        const statusEl = document.getElementById(node.statusId);
        el.className = 'pipe-node';
        statusEl.textContent = 'Querying Database...';
    });

    const banner = document.getElementById('pipeline-banner-output');
    banner.style.display = 'none';

    const globalScoreDisplay = document.getElementById('hero-score-val');
    globalScoreDisplay.textContent = '0%';
    globalScoreDisplay.style.color = '#CA8A04';

    let index = 0;
    let computedMatchPercentage = 0;

    function evaluateStep() {
        if (index >= databaseLayers.length) {
            pipelineRunning = false;
            
            // Render terminal status context outputs via banner component
            banner.style.display = 'block';
            const titleEl = document.getElementById('banner-action-title');
            const descEl = document.getElementById('banner-action-desc');

            if (computedMatchPercentage >= 80) {
                globalScoreDisplay.style.color = '#166534';
                banner.className = 'action-alert-banner banner-success';
                titleEl.textContent = 'Verification Perfect: 100% Match Signature';
                descEl.textContent = 'Transaction executed successfully. No OTP, 2FA, or interactive authentication challenge prompted to the user.';
            } else {
                globalScoreDisplay.style.color = '#DC2626';
                banner.className = 'action-alert-banner banner-error';
                titleEl.textContent = 'Security Compromise: Mismatched Database Blueprint';
                descEl.textContent = 'Friction active! Transaction blocked instantly. Moving asset to isolated hold state and generating out-of-band identity validation token prompts.';
            }
            return;
        }

        const layer = databaseLayers[index];
        const nodeBox = document.getElementById(layer.elementId);
        const statusLabel = document.getElementById(layer.statusId);

        nodeBox.classList.add('evaluating');
        statusLabel.textContent = 'Comparing with DB Template...';

        setTimeout(() => {
            nodeBox.classList.remove('evaluating');
            let isMatch = true;
            let currentPoints = 0;

            if (executionMode === 'GENUINE') {
                isMatch = true;
                currentPoints = layer.matchPoints;
            } else {
                // Malicious Actor Trigger Configurations mapping profile faults
                if (layer.id === 'l1' || layer.id === 'l3' || layer.id === 'l5') {
                    isMatch = false;
                    currentPoints = 0; // Absolute anomalies
                } else {
                    isMatch = false;
                    currentPoints = 5; // Fragmented tracking variations
                }
            }

            computedMatchPercentage += currentPoints;

            if (isMatch) {
                nodeBox.classList.add('passed');
                statusLabel.textContent = layer.msgPass;
            } else {
                nodeBox.classList.add('failed');
                statusLabel.textContent = layer.msgFail;
            }

            globalScoreDisplay.textContent = `${computedMatchPercentage}%`;
            index++;
            evaluateStep();

        }, 800); // Fast 800ms processing cadence per gateway stage
    }

    evaluateStep();
}

window.addEventListener('DOMContentLoaded', () => {
    const globalScoreDisplay = document.getElementById('hero-score-val');
    if (globalScoreDisplay) globalScoreDisplay.textContent = '0%';
});