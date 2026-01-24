#!/bin/bash
# Update all resource links to use Gumroad overlay

sed -i 's|<a href="#" class="btn btn-secondary btn-small">Download Free</a>|<a href="https://yourname.gumroad.com/l/CHANGEME" class="btn btn-secondary btn-small gumroad-button" target="_blank" rel="noopener noreferrer">Get Free Resource</a>|g' resources.html

echo "Updated resource buttons"
