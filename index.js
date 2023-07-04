import dotenv from 'dotenv';
import { exec } from 'child_process';

dotenv.config();

// Regular expression to validate GitHub and GitLab repository URLs
const gitRepoUrlRegex =
  /^(https?:\/\/)?(www\.)?(github\.com|gitlab\.com)\/[^\s/]+\/[^\s/]+\.git$/;

// Function to modify the GitHub URL and run it as a command
function modifyAndRunGitHubURL(url, baseDir) {
  const TOKEN = process.env.GITHUB_TOKEN;
  if (!TOKEN) {
    console.error('Please provide a valid GitHub token.');
    process.exit(1);
  }

  const modifiedUrl = url.replace(
    /^(https?:\/\/)?(www\.)?(github\.com|gitlab\.com)/,
    `https://oauth:${TOKEN}@$3`
  );

  console.log('Base dir:', baseDir);
  const command = `git clone ${modifiedUrl}`;

  exec(command, { cwd: baseDir }, (error, stdout, stderr) => {
    if (error) {
      console.error('Failed to run the command:', error);
      process.exit(1);
    }
    console.log('Command executed successfully!');
    console.log('Output:', stdout);
    console.log('Error:', stderr);
  });
}

// Get the command line arguments
const [baseDir, url] = process.argv.slice(2);

// Validate the input
if (!url || !gitRepoUrlRegex.test(url)) {
  console.error('Please provide a valid GitHub or GitLab URL as an argument.');
  process.exit(1);
}

if (!baseDir) {
  console.error('Please provide the base directory as an argument.');
  process.exit(1);
}

// Call the function to modify and run the GitHub URL
modifyAndRunGitHubURL(url, baseDir);
