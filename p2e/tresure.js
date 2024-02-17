import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

public class MainActivity extends AppCompatActivity {

    private EditText inputEditText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        inputEditText = findViewById(R.id.inputEditText);
        Button scanButton = findViewById(R.id.scanButton);

        scanButton.setOnClickListener(v -> initiateScan());
    }

    private void initiateScan() {
        IntentIntegrator integrator = new IntentIntegrator(this);
        integrator.setPrompt("Scan a QR code");
        integrator.setBeepEnabled(false);
        integrator.setOrientationLocked(false);
        integrator.initiateScan();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() == null) {
                Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show();
            } else {
                // Set the scanned data to the input field
                inputEditText.setText(result.getContents());
                // Execute the function with the scanned data
                executeFunction(result.getContents());
            }
        }
    }

    private void executeFunction(String scannedData) {
        // Your function implementation here
        Toast.makeText(this, "Scanned Data: " + scannedData, Toast.LENGTH_LONG).show();
        // Example: You can open a URL using the scanned data
        // Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(scannedData));
        // startActivity(browserIntent);
    }
}