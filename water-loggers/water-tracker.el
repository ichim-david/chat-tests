(defvar water-tracker-log-file "~/.emacs.d/water-log.txt"
  "Path to the water intake log file.")

(defvar water-tracker-date-format "%Y-%m-%d"
  "Date format for logging.")

(defun water-tracker-log (amount)
  "Log AMOUNT of water intake in milliliters."
  (interactive "nEnter amount of water in ml: ")
  (let ((current-date (format-time-string water-tracker-date-format)))
    (if (water-tracker-write-log current-date amount)
        (message "Logged %d ml of water on %s" amount current-date)
      (message "Failed to log water intake."))))

(defun water-tracker-write-log (date amount)
  "Write DATE and AMOUNT to the log file."
  (with-temp-buffer
    (insert (format "%s: %d ml\n" (format-time-string "%Y-%m-%d %H:%M:%S") amount))
    (condition-case nil
        (append-to-file (point-min) (point-max) water-tracker-log-file)
      (error nil))))

(defun water-tracker-total ()
  "Display total water intake for today."
  (interactive)
  (let ((current-date (format-time-string water-tracker-date-format))
        (total 0))
    (when (file-exists-p water-tracker-log-file)
      (with-temp-buffer
        (insert-file-contents water-tracker-log-file)
        (goto-char (point-min))
        (while (re-search-forward (format "^%s: \\([0-9]+\\) ml" current-date) nil t)
          (setq total (+ total (string-to-number (match-string 1))))))
      (message "Total water intake for %s: %d ml" current-date total))))

(defun water-tracker-clear ()
  "Clear the water intake log."
  (interactive)
  (when (file-exists-p water-tracker-log-file)
    (delete-file water-tracker-log-file)
    (message "Water intake log cleared.")))

(defun water-tracker-show-log ()
  "Show the water intake log."
  (interactive)
  (if (file-exists-p water-tracker-log-file)
      (with-temp-buffer
        (insert-file-contents water-tracker-log-file)
        (display-buffer (current-buffer)))
    (message "No water intake log found.")))

(defun water-tracker-setup ()
  "Setup water tracker."
  (unless (file-exists-p water-tracker-log-file)
    (with-temp-file water-tracker-log-file (insert "Water intake log\n"))))

(global-set-key (kbd "C-c w l") 'water-tracker-log)
(global-set-key (kbd "C-c w t") 'water-tracker-total)
(global-set-key (kbd "C-c w c") 'water-tracker-clear)
(global-set-key (kbd "C-c w s") 'water-tracker-show-log)
